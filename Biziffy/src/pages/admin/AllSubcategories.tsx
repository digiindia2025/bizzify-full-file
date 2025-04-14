import { useState, useEffect } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AllSubcategories = () => {
  const { toast } = useToast();
  const [subcategoriesData, setSubcategoriesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState<any | null>(null);
  const [updatedSubcategory, setUpdatedSubcategory] = useState<any>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const subcategoriesPerPage = 5;

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/subcategories");
      setSubcategoriesData(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast({ title: "Error", description: "Failed to fetch subcategories" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleEdit = (subcategory: any) => {
    setEditSubcategory(subcategory);
    setUpdatedSubcategory({
      name: subcategory.name,
      category: subcategory.category,
      status: subcategory.status,
      imageUrl: subcategory.imageUrl,
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/subcategories/${editSubcategory._id}`,
        updatedSubcategory
      );
      const updatedList = subcategoriesData.map((sub) =>
        sub._id === editSubcategory._id ? res.data : sub
      );
      setSubcategoriesData(updatedList);
      setEditModalOpen(false);
      toast({ title: "Updated", description: "Subcategory updated successfully." });
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast({ title: "Error", description: "Failed to update subcategory." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/subcategories/${id}`);
      setSubcategoriesData((prev) => prev.filter((sub) => sub._id !== id));
      toast({ title: "Deleted", description: "Subcategory deleted successfully." });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast({ title: "Error", description: "Failed to delete subcategory." });
    }
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Name", "Category", "Status", "Create Date"];
    const rows = filteredSubcategories.map((sub) => [
      sub._id,
      sub.name,
      sub.category,
      sub.status,
      new Date(sub.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subcategories.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({ title: "Exported", description: "Subcategories exported to CSV." });
  };

  const handleApplyBulkAction = () => {
    toast({ title: "Apply Bulk Action", description: "Bulk action applied" });
  };

  const filteredSubcategories = subcategoriesData.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * subcategoriesPerPage;
  const indexOfFirst = indexOfLast - subcategoriesPerPage;
  const currentSubcategories = filteredSubcategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSubcategories.length / subcategoriesPerPage);

  return (
    <AdminLayout title="All Subcategories">
      {/* Top Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Mark as Active</option>
            <option>Mark as Inactive</option>
          </select>
          <Button onClick={handleApplyBulkAction} className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
            <Link to="/admin/subcategories/add">Add New Subcategory</Link>
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3"><input type="checkbox" /></th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Subcategory Name</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Main Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Create Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-6">Loading...</td></tr>
            ) : currentSubcategories.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-6">No subcategories found.</td></tr>
            ) : (
              currentSubcategories.map((subcategory) => (
                <tr key={subcategory._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><input type="checkbox" /></td>
                  <td className="px-6 py-4">{subcategory._id}</td>
                  <td className="px-6 py-4">{subcategory.name}</td>
                  <td className="px-6 py-4">
                    <img src={subcategory.imageUrl || "https://via.placeholder.com/40"} alt={subcategory.name} className="h-10 w-10 rounded" />
                  </td>
                  <td className="px-6 py-4">{subcategory.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${subcategory.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {subcategory.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DeleteButton onClick={() => setDeleteId(subcategory._id)} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <EditButton onClick={() => handleEdit(subcategory)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => setCurrentPage(page)}>
            {page}
          </Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Subcategory Name"
              value={updatedSubcategory.name || ""}
              onChange={(e) =>
                setUpdatedSubcategory({ ...updatedSubcategory, name: e.target.value })
              }
            />
            <Input
              placeholder="Main Category"
              value={updatedSubcategory.category || ""}
              onChange={(e) =>
                setUpdatedSubcategory({ ...updatedSubcategory, category: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={updatedSubcategory.imageUrl || ""}
              onChange={(e) =>
                setUpdatedSubcategory({ ...updatedSubcategory, imageUrl: e.target.value })
              }
            />
            <select
              value={updatedSubcategory.status || "active"}
              onChange={(e) =>
                setUpdatedSubcategory({ ...updatedSubcategory, status: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button onClick={handleUpdate} className="w-full bg-blue-500 hover:bg-blue-600">
              Update Subcategory
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AllSubcategories;
