import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import axios from "axios";

interface ChildCategoryData {
  id: number;
  childCategory: string;
  subcategory: string;
  mainCategory: string;
  status: string;
  createDate: string;
  image?: string;
}

const ChildCategories = () => {
  const { toast } = useToast();
  const [childCategories, setChildCategories] = useState<ChildCategoryData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchChildCategories = async () => {
      try {
        const res = await axios.get("/api/admin/child-categories");
        console.log("Fetched child categories:", res.data); // Check the shape of the response
        if (Array.isArray(res.data)) {
          setChildCategories(res.data); // Assuming the response is an array of categories
        } else {
          console.error("Unexpected data format:", res.data);
          setChildCategories([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast({ title: "Error", description: "Failed to fetch child categories" });
        setChildCategories([]);
      }
    };
    
    fetchChildCategories();
  }, [toast]);

  const filteredData = childCategories.filter((item) =>
    item.childCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mainCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id: number) => {
    toast({ title: "Edit Child Category", description: `Edit child category #${id}` });
  };

  const handleDelete = (id: number) => {
    toast({ title: "Delete Child Category", description: `Delete child category #${id}` });
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Child Category", "Subcategory", "Main Category", "Status", "Create Date"];
    const rows = filteredData.map((item) => [
      item.id,
      item.childCategory,
      item.subcategory,
      item.mainCategory,
      item.status,
      item.createDate
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "child_categories.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Child Categories">
      {/* Top Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Mark as Active</option>
            <option>Mark as Inactive</option>
          </select>
          <Button onClick={() => toast({ title: "Bulk Action" })} className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button onClick={() => toast({ title: "Navigate to Add" })} className="bg-blue-500 hover:bg-blue-600">
            Add Child Category
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

          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subcategory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Main Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.childCategory}</td>
                <td className="px-6 py-4">
                  {item.image ? (
                    <img src={item.image} alt={item.childCategory} className="h-10 w-10 rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-500">No img</div>
                  )}
                </td>
                <td className="px-6 py-4">{item.subcategory}</td>
                <td className="px-6 py-4">{item.mainCategory}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold ${item.status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">{item.createDate}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <DeleteButton onClick={() => handleDelete(item.id)} />
                    <EditButton onClick={() => handleEdit(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default ChildCategories;
