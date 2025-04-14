import { useState, useEffect } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Department {
  _id: string;
  department: string;
  status: string;
}

const Departments = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newDepartment, setNewDepartment] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const departmentsPerPage = 4;

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      if (Array.isArray(res.data)) {
        setDepartments(res.data);
      } else if (Array.isArray(res.data.departments)) {
        setDepartments(res.data.departments);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch departments." });
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/departments", {
        department: newDepartment,
        status: "active",
      });
      toast({ title: "Added", description: "Department added successfully." });
      setNewDepartment("");
      fetchDepartments();
    } catch (error) {
      toast({ title: "Error", description: "Failed to add department." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      toast({ title: "Deleted", description: "Department deleted." });
      setEditModalOpen(false);
      fetchDepartments();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete department." });
    }
  };

  const handleUpdate = async () => {
    if (!selectedDept) return;
    try {
      await axios.put(`http://localhost:5000/api/departments/${selectedDept._id}`, {
        department: selectedDept.department,
        status: selectedDept.status,
      });
      toast({ title: "Updated", description: "Department updated successfully." });
      setEditModalOpen(false);
      fetchDepartments();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update department." });
    }
  };

  const openEditModal = (dept: Department) => {
    setSelectedDept({ ...dept });
    setEditModalOpen(true);
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Department,Status"]
        .concat(
          filteredDepartments.map((dept) =>
            [dept._id, dept.department, dept.status].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "Exported", description: "Departments exported to CSV" });
  };

  const indexOfLast = currentPage * departmentsPerPage;
  const indexOfFirst = indexOfLast - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  return (
    <AdminLayout title="Departments">
      {/* Add + Search + Export */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="New Department Name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleAddDepartment} className="bg-blue-500 hover:bg-blue-600">
            Add
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search Department"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800">
          Notice: Department status inactive means the department will not show while creating a ticket.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDepartments.map((dept) => (
              <tr key={dept._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{dept._id}</td>
                <td className="px-6 py-4 text-sm">{dept.department}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-8 rounded-l ${
                        dept.status === "active" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></span>
                    <span
                      className={`ml-2 px-2 text-xs font-semibold rounded ${
                        dept.status === "active" ? "text-green-800" : "text-yellow-800"
                      }`}
                    >
                      {dept.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-2">
                    <EditButton onClick={() => openEditModal(dept)} />
                    <DeleteButton onClick={() => handleDelete(dept._id)} />
                  </div>
                </td>
              </tr>
            ))}
            {currentDepartments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
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
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
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
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Department Name</Label>
              <Input
                value={selectedDept?.department || ""}
                onChange={(e) =>
                  setSelectedDept((prev) => (prev ? { ...prev, department: e.target.value } : prev))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={selectedDept?.status || "active"}
                onValueChange={(value) =>
                  setSelectedDept((prev) => (prev ? { ...prev, status: value } : prev))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedDept?._id || "")}
            >
              Delete
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Departments;
