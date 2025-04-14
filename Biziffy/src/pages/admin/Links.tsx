import { useEffect, useState } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://localhost:5000/api/links";

const Links = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", link: "" });
  const itemsPerPage = 4;

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/all`);
      setLinks(res.data);
    } catch (error) {
      console.error("Error fetching links", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/create`, formData);
      toast({ title: "Link Added", description: "New link successfully created." });
      setShowAddModal(false);
      setFormData({ title: "", link: "" });
      fetchLinks();
    } catch {
      toast({ title: "Error", description: "Failed to add link." });
    }
  };

  const handleEdit = (link: any) => {
    setSelectedLink(link);
    setFormData({ title: link.title, link: link.link });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${API_BASE_URL}/update/${selectedLink._id}`, formData);
      toast({ title: "Link Updated", description: "Link successfully updated." });
      setShowEditModal(false);
      setFormData({ title: "", link: "" });
      fetchLinks();
    } catch {
      toast({ title: "Error", description: "Failed to update link." });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${selectedLink._id}`);
      toast({ title: "Link Deleted", description: `Link #${selectedLink._id} deleted.` });
      setShowDeleteConfirm(false);
      fetchLinks();
    } catch {
      toast({ title: "Delete Failed", description: "Could not delete the link." });
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Link", "Title"];
    const rows = filteredLinks.map((link: any) => [link._id, link.link, link.title]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "links.csv";
    a.click();
  };

  const filteredLinks = links.filter((link: any) =>
    Object.values(link).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const currentLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (page: number) => setCurrentPage(page);

  const renderPageNumbers = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <AdminLayout title="Links">
      {/* Top Controls */}
      <div className="mb-6 flex justify-between items-center">
        <Input
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
        <div className="flex gap-3">
          <Button onClick={handleExportCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-600">
            Add New Link
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLinks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No links found.
                </td>
              </tr>
            ) : (
              currentLinks.map((link: any, index: number) => (
                <tr key={link._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a href={`https://${link.link}`} target="_blank" rel="noopener noreferrer">
                      {link.link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{link.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditButton onClick={() => handleEdit(link)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DeleteButton
                      onClick={() => {
                        setSelectedLink(link);
                        setShowDeleteConfirm(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {renderPageNumbers().map((num) => (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    onClick={() => paginate(num)}
                    isActive={num === currentPage}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <Label>Link</Label>
              <Input value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
            </div>
            <Button onClick={handleAddSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <Label>Link</Label>
              <Input value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
            </div>
            <Button onClick={handleEditSubmit} className="w-full bg-yellow-600 hover:bg-yellow-700">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action will permanently delete the link.</p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Links;
