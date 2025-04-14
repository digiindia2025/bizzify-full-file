import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ViewButton,
  DeleteButton,
  EditButton,
} from "@/components/ui/table-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import axios from "axios";

interface SupportTicket {
  _id: string;
  title: string;
  priority: string;
  dateTime: string;
  status: string;
}

const SupportTickets = () => {
  const { toast } = useToast();
  const [supportTicketsData, setSupportTicketsData] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 4;

  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const fetchSupportTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/support-tickets");
      setSupportTicketsData(res.data.data);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
    }
  };

  useEffect(() => {
    fetchSupportTickets();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredTickets = supportTicketsData.filter((ticket) =>
    `${ticket._id} ${ticket.title} ${ticket.priority} ${ticket.status}`
      .toLowerCase()
      .includes(searchTerm)
  );

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handleExportToCSV = () => {
    const csvContent = [
      ["ID", "Title", "Priority", "DateTime", "Status"],
      ...filteredTickets.map((ticket) => [
        ticket._id,
        ticket.title,
        ticket.priority,
        ticket.dateTime,
        ticket.status,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "support_tickets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setViewModal(true);
  };

  const handleEdit = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setEditModal(true);
  };

  const handleDelete = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedTicket) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/support-tickets/${selectedTicket._id}`);
      toast({ title: "Deleted", description: `Ticket deleted successfully.` });
      setDeleteModal(false);
      fetchSupportTickets();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete ticket" });
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedTicket) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/support-tickets/${selectedTicket._id}`, {
        status: newStatus,
      });
      toast({ title: "Updated", description: `Ticket status changed to ${newStatus}` });
      setEditModal(false);
      fetchSupportTickets();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status" });
    }
  };

  return (
    <AdminLayout title="Support Tickets">
      {/* Top Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Mark as Open</option>
            <option>Mark as Closed</option>
            <option>Delete Selected</option>
          </select>
          <Button onClick={() => toast({ title: "Bulk Action", description: "Action applied" })} className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add Ticket
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search by ID, status, priority..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3"><input type="checkbox" /></th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4">{ticket._id.slice(-5)}</td>
                <td className="px-6 py-4">{ticket.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    ticket.priority === "urgent"
                      ? "bg-red-100 text-red-800"
                      : ticket.priority === "high"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{ticket.dateTime}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${ticket.status === "open" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`ml-2 px-2 text-xs rounded font-semibold ${
                      ticket.status === "open" ? "text-green-800" : "text-red-800"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <ViewButton onClick={() => handleView(ticket)} />
                  <DeleteButton onClick={() => handleDelete(ticket)} />
                  {ticket.status === "open" && <EditButton onClick={() => handleEdit(ticket)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* View Dialog */}
      {selectedTicket && (
        <Dialog open={viewModal} onOpenChange={setViewModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedTicket._id}</p>
              <p><strong>Title:</strong> {selectedTicket.title}</p>
              <p><strong>Priority:</strong> {selectedTicket.priority}</p>
              <p><strong>Date:</strong> {selectedTicket.dateTime}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {selectedTicket && (
        <Dialog open={editModal} onOpenChange={setEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Ticket Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button
                onClick={() => handleStatusChange("open")}
                className="w-full bg-green-500"
              >
                Mark as Open
              </Button>
              <Button
                onClick={() => handleStatusChange("closed")}
                className="w-full bg-red-500"
              >
                Mark as Closed
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedTicket && (
        <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <p>Do you really want to delete this ticket?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
              <Button onClick={confirmDelete} className="bg-red-500 text-white">Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default SupportTickets;
