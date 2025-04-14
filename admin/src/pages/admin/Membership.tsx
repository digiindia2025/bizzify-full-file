import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Trash2, Mail } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 4;

const Membership = () => {
  const { toast } = useToast();
  const [memberships, setMemberships] = useState<any[]>([]);
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [historyData, setHistoryData] = useState<any | null>(null);
  const [emailPopup, setEmailPopup] = useState<any | null>(null);
  const [message, setMessage] = useState("");
  const [deletePopup, setDeletePopup] = useState<any | null>(null);

  // Fetch memberships on load
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/memberships");
        setMemberships(res.data);
      } catch (err) {
        console.error(err);
        setMemberships([]);
      }
    };
    fetchMemberships();
  }, []);

  // Filter memberships based on active/inactive and search term
  const filteredData = useMemo(() => {
    return memberships.filter((member) => {
      const matchesStatus =
        (filterActive && member.status === "Active") ||
        (filterInactive && member.status === "Inactive");
      const matchesSearch = [
        member.userDetails?.name,
        member.userDetails?.email,
        member.membershipDetails?.title,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [memberships, filterActive, filterInactive, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Handle CSV export
  const handleExportCSV = () => {
    const csvRows = [
      ["ID", "Membership Title", "Name", "Email", "Phone", "Gateway", "Payment Status", "Status", "Purchase Date", "Expire Date"],
      ...filteredData.map((m: any, i: number) => [
        i + 1,
        m.membershipDetails?.title,
        m.userDetails?.name,
        m.userDetails?.email,
        m.userDetails?.phone,
        m.paymentGateway,
        m.paymentStatus,
        m.status,
        m.purchaseDate,
        m.expireDate,
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "user_memberships.csv";
    link.click();
  };

  // Handle status change
  const handleStatusChange = (id: string, type: string, value: string) => {
    setMemberships((prev) =>
      prev.map((item) => (item._id === id ? { ...item, [type]: value } : item))
    );
    toast({ title: `${type} Updated`, description: `Updated to ${value}` });
  };

  // Handle delete with backend call and UI update
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/memberships/${id}`); // API call to delete
      setMemberships((prev) => prev.filter((item) => item._id !== id)); // Remove from UI
      setDeletePopup(null);
      toast({ title: "Deleted", description: "Membership successfully deleted." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete membership." });
    }
  };


  
  return (
    <AdminLayout title="User Memberships">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-2">
          <Button variant={filterActive ? "default" : "outline"} onClick={() => { setFilterActive(true); setFilterInactive(false); setPage(1); }}>Active</Button>
          <Button variant={filterInactive ? "default" : "outline"} onClick={() => { setFilterActive(false); setFilterInactive(true); setPage(1); }}>Inactive</Button>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <Input type="text" placeholder="Search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} className="pl-10" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={handleExportCSV} variant="outline"><Download className="h-4 w-4 mr-2" />Export CSV</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {"# Membership User Gateway Payment Status Purchase Expire Actions".split(" ").map((text, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((member: any, i: number) => (
              <tr key={member._id || i}>
                <td className="px-6 py-4 text-sm">{i + 1 + (page - 1) * ITEMS_PER_PAGE}</td>
                <td className="px-6 py-4 text-sm">{member.membershipDetails?.title || "-"}</td>
                <td className="px-6 py-4 text-sm">
                  <div>{member.userDetails?.name}</div>
                  <div className="text-xs text-gray-500">{member.userDetails?.email}</div>
                  <div className="text-xs text-gray-500">{member.userDetails?.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm">{member.paymentGateway}</td>
                <td className="px-6 py-4">
                  <Select value={member.paymentStatus} onValueChange={(val) => handleStatusChange(member._id, "paymentStatus", val)}>
                    <SelectTrigger className={`w-[120px] ${member.paymentStatus === "Complete" ? "bg-green-100" : "bg-yellow-100"}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <Select value={member.status} onValueChange={(val) => handleStatusChange(member._id, "status", val)}>
                    <SelectTrigger className={`w-[120px] ${member.status === "Active" ? "bg-green-100" : "bg-red-100"}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4 text-sm">{member.purchaseDate}</td>
                <td className="px-6 py-4 text-sm">{member.expireDate}</td>
                <td className="px-6 py-4 space-y-2">
                  <Button variant="outline" onClick={() => setHistoryData(member)} className="w-full">History</Button>
                  <Button variant="outline" onClick={() => setEmailPopup(member)} className="w-full"><Mail className="w-4 h-4 mr-1" /> Email</Button>
                  <Button variant="destructive" onClick={() => setDeletePopup(member)} className="w-full"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <Button variant="outline" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
          {[...Array(totalPages)].map((_, i) => i + 1).slice(0, 4).map((pg) => (
            <Button key={pg} variant={page === pg ? "default" : "outline"} onClick={() => setPage(pg)}>{pg}</Button>
          ))}
          <Button variant="outline" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
        </div>
      )}

      <Dialog open={!!historyData} onOpenChange={() => setHistoryData(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Membership History</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {historyData?.userDetails?.name}</div>
            <div><strong>Email:</strong> {historyData?.userDetails?.email}</div>
            <div><strong>Membership:</strong> {historyData?.membershipDetails?.title}</div>
            <div><strong>Gateway:</strong> {historyData?.paymentGateway}</div>
            <div><strong>Payment Status:</strong> {historyData?.paymentStatus}</div>
            <div><strong>Status:</strong> {historyData?.status}</div>
            <div><strong>Purchased:</strong> {historyData?.purchaseDate}</div>
            <div><strong>Expires:</strong> {historyData?.expireDate}</div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!emailPopup} onOpenChange={() => setEmailPopup(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Email</DialogTitle></DialogHeader>
          <Textarea placeholder="Enter message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={() => {
            toast({ title: "Email Sent", description: `Message sent to ${emailPopup?.userDetails?.email}` });
            setMessage("");
            setEmailPopup(null);
          }}>Send</Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletePopup} onOpenChange={() => setDeletePopup(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeletePopup(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deletePopup._id)}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Membership;
