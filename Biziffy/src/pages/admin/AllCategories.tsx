import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Category {
  _id: string;
  name: string;
  icon?: string | File;
  status: string;
  createDate: string;
}

const AllCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      toast({
        title: "Fetch Failed",
        description: "Could not load categories.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editCategory) return;
    try {
      const formData = new FormData();
      formData.append("name", editCategory.name);
      formData.append("status", editCategory.status);
      if (editCategory.icon instanceof File) {
        formData.append("icon", editCategory.icon);
      }

      await axios.put(`http://localhost:5000/api/categories/${editCategory._id}`, formData);

      toast({
        title: "Category Updated",
        description: "Changes saved successfully.",
      });

      fetchCategories();
      setIsEditOpen(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update category.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryToDelete}`);
      setCategories(prev => prev.filter(cat => cat._id !== categoryToDelete));
      toast({ title: "Category Deleted", description: "Category deleted successfully." });
    } catch {
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" });
    }
    setIsDeleteConfirmOpen(false);
    setCategoryToDelete(null); // clear selection
  };


  const handleExportToCSV = () => {
    const headers = ["ID", "Name", "Icon", "Status", "Create Date"];
    const rows = filteredCategories.map(cat => [
      cat._id,
      `"${cat.name}"`,
      typeof cat.icon === "string" ? cat.icon : "",
      cat.status,
      cat.createDate
    ]);
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "categories.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Exported", description: "Categories exported to CSV." });
  };

  const handleApplyBulkAction = () => {
    toast({
      title: "Apply Bulk Action",
      description: "Apply bulk action to selected categories",
    });
  };

  return (
    <AdminLayout title="All Categories">
      {/* Top Controls */}
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
            <Link to="/admin/categories/add">Add New Category</Link>
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCategories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4 text-sm">{category._id}</td>
                <td className="px-6 py-4 text-sm">{category.name}</td>
                <td className="px-6 py-4">
                  {typeof category.icon === "string" ? (
                    <img src={category.icon} alt={category.name} className="h-10 w-10 rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">No icon</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{category.createDate}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <DeleteButton onClick={() => handleDelete(category._id)} />
                    <EditButton onClick={() => handleEdit(category)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => setCurrentPage(page)}>{page}</Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </div>


      {isDeleteConfirmOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-6 border-t-8 border-red-600 animate-slide-down">
      <h2 className="text-xl font-bold text-red-600 mb-2">⚠️ Confirm Deletion</h2>
      <p className="text-gray-700 mb-4">
        Are you absolutely sure you want to delete this category? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setIsDeleteConfirmOpen(false)}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}





      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={editCategory?.name || ""}
                onChange={(e) =>
                  setEditCategory((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={editCategory?.status}
                onChange={(e) =>
                  setEditCategory((prev) =>
                    prev ? { ...prev, status: e.target.value } : null
                  )
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <Label>Icon</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditCategory((prev) =>
                    prev && e.target.files
                      ? { ...prev, icon: e.target.files[0] }
                      : prev
                  )
                }
              />
              {editCategory?.icon && (
                <img
                  src={
                    typeof editCategory.icon === "string"
                      ? editCategory.icon
                      : URL.createObjectURL(editCategory.icon)
                  }
                  alt="Preview"
                  className="h-12 w-12 mt-2 rounded border"
                />
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AllCategories;
