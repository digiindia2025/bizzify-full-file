import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Lock, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Deactivated";
}

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<string>("Bulk Action");
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      console.log("Fetched data:", data);

      // Corrected data handling: Ensure we're always working with an array of users
      if (data && Array.isArray(data)) {
        setUserList(data);
      } else if (data && data.users && Array.isArray(data.users)) {
        setUserList(data.users);
      } else {
        console.error("Unexpected response format:", data);
        setUserList([]);
        setError("Failed to load users due to unexpected data format."); // Added error message for clarity
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
      setUserList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUserList((prev) => prev.filter((u) => u._id !== userId));
      } else {
        console.error("Error deleting user:", res.statusText); // Log error message
        // Optionally set an error state to inform the user
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      // Optionally set an error state to inform the user
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: UserData["status"]) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/toggle-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserList((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setEditingStatusId(null);
      } else {
        console.error("Failed to update user status:", response.statusText); // Log error message
        // Optionally set an error state
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally set an error state
    }
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (page: number) => setCurrentPage(page);

  const renderPageNumbers = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Status"];
    const rows = filteredUsers.map((u) => [u._id, u.name, u.email, u.phone, u.status]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users.csv";
    a.click();
  };

  const getStatusColor = (status: UserData["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Deactivated":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const handleViewUserDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleBulkAction = async () => {
    if (bulkAction === "Delete") {
      const confirmed = window.confirm("Are you sure you want to delete the selected users?");
      if (confirmed) {
        try {
          
          const usersToDelete = currentUsers.map((user) => user._id);
          await Promise.all(
            usersToDelete.map((userId) =>
              fetch(`http://localhost:5000/api/admin/users/${userId}`, { method: "DELETE" })
            )
          );
          // After successful deletion, refetch the users to update the UI
          fetchUsers();
        } catch (err) {
          console.error("Error deleting users:", err);
          // Optionally set an error state
        }
      }
    } else if (bulkAction === "Deactivate") {
      // In a real application, you'd have logic to identify selected users and an API endpoint for bulk deactivation.
      console.log("Bulk Deactivate action triggered (implementation needed)");
      
    }
    // Reset bulk action dropdown
    setBulkAction("Bulk Action");
  };

  return (
    <AdminLayout title="All Users">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 border rounded-md"
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Deactivate">Deactivate</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleBulkAction}>
            Apply
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        {loading ? (
          <div className="p-4 text-center">Loading users...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    {/* You'll need to implement logic to select multiple users for bulk actions */}
                    <input type="checkbox" className="h-4 w-4" />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {/* You'll need to implement logic to select this user for bulk actions */}
                      <input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <div className="relative inline-block">
                        {editingStatusId === user._id ? (
                          <div className="absolute z-10 bg-white border rounded shadow-md">
                            {["Active", "Inactive", "Deactivated"].map((status) => (
                              <div
                                key={status}
                                className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleUpdateStatus(user._id, status as UserData["status"])}
                              >
                                {status}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            onClick={() => setEditingStatusId(user._id)}
                            className={`px-3 py-1 text-sm rounded-full cursor-pointer inline-flex items-center gap-1 ${getStatusColor(user.status)}`}
                          >
                            {user.status}
                            <Pencil className="w-3 h-3 opacity-60" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => handleViewUserDetails(user._id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Added a conditional rendering for the case when there are no users */}
                {currentUsers.length === 0 && !loading && !error && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="py-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {currentPage > 1 && (
                      <PaginationPrevious
                        href="#"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                      />
                    )}
                  </PaginationItem>
                  {renderPageNumbers().map((num) => (
                    <PaginationItem key={num} className={num === currentPage ? "active" : ""}>
                      <PaginationLink href="#" onClick={() => paginate(num)}>
                        {num}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    {currentPage < totalPages && (
                      <PaginationNext
                        href="#"
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllUsers;