// "use client";
import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
      console.log("API Response:", response.data);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.data;
      
      
      if (data?.users && Array.isArray(data.users)) {
        setUserList(data.users.filter((user): user is UserData =>
          typeof user?._id === 'string' &&
          typeof user?.name === 'string' &&
          typeof user?.email === 'string' &&
          typeof user?.phone === 'string' &&
          ['Active', 'Inactive', 'Deactivated'].includes(user?.status)
        ));
      } else if (Array.isArray(data)) {
        setUserList(data.filter((user): user is UserData =>
          typeof user?._id === 'string' &&
          typeof user?.name === 'string' &&
          typeof user?.email === 'string' &&
          typeof user?.phone === 'string' &&
          ['Active', 'Inactive', 'Deactivated'].includes(user?.status)
        ));
      }
       else {
        console.error("Unexpected response format:", data);
        setUserList([]);
        setError("Failed to load users due to unexpected data format.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Failed to load users: " + err.message);
      } else {
        setError("Failed to load users: An unknown error occurred.");
      }
      setUserList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUserList((prev) => prev.filter((u) => u._id !== userId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user: " + err.message);
      } else {
        console.error("Unknown error deleting user:", err);
        setError("Failed to delete user due to an unknown error.");
      }
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: UserData["status"]) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/admin/users/${userId}/toggle-status`, { status: newStatus }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser: UserData = response.data;
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditingStatusId(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating status:", error);
        setError("Failed to update status: " + error.message);
      }
    }
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

 
  const handleBulkCheckboxChange = () => {
    const currentVisibleIds = currentUsers.map((user) => user._id);
    const allSelected = currentVisibleIds.every((id) => selectedUsers.includes(id));

    if (allSelected) {
      setSelectedUsers((prev) => prev.filter((id) => !currentVisibleIds.includes(id)));
    } else {
      setSelectedUsers((prev) => [...prev, ...currentVisibleIds].filter((v, i, a) => a.indexOf(v) === i));
    }
  };

  console.log("Search Query:", searchQuery);
  console.log("Users:", userList);
  
  const filteredUsers = searchQuery
    ? userList.filter((user) => {
        const name = user?.name || "";
        const email = user?.email || "";
        const phone = user?.phone || "";
  
        const matches =
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phone.includes(searchQuery);
  
        console.log(`Checking user: ${name}, match: ${matches}`);
        return matches;
      })
    : userList;
  
    console.log("Filtered Users:", filteredUsers);
  

  
// console.log("Filtered Users:", filteredUsers);

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

// Pagination handler
const paginate = (page: number) => setCurrentPage(page);

// Page number renderer
const renderPageNumbers = () => {
  const maxVisible = 10;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 1));
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
    const headers = ["ID", "Full Name", "Email", "Phone", "Status"];
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
      if (selectedUsers.length > 0) {
        const confirmed = window.confirm("Are you sure you want to delete the selected users?");
        if (confirmed) {
          try {
            const deletePromises = selectedUsers.map((userId) =>
              axios.delete(`http://localhost:5000/api/admin/users/${userId}`)
            );
            const responses = await Promise.all(deletePromises);
            if (responses.every((res) => res.status === 200)) {
              fetchUsers();
              setSelectedUsers([]);
              alert("Selected users deleted successfully.");
            } else {
              const errors = await Promise.all(responses.map(res => res.status !== 200 ? res.data?.message || `Failed with status ${res.status}` : null));
              console.error("Error deleting users:", errors);
              setError("Failed to delete some or all users.");
            }
          } catch (err: unknown) {
            console.error("Error deleting users:", err);
            setError("Failed to delete users: " + (err instanceof Error ? err.message : "An unknown error occurred."));
          }
        }
      } else {
        alert("Please select users to delete.");
      }
    } else if (bulkAction === "Deactivate") {
      if (selectedUsers.length > 0) {
        try {
          const response = await axios.patch("http://localhost:5000/api/admin/users/bulk-deactivate", { userIds: selectedUsers }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            fetchUsers();
            setSelectedUsers([]);
            alert("Selected users deactivated successfully.");
          } else {
            console.error("Failed to deactivate users:", response.data?.message || `Failed with status ${response.status}`);
            setError("Failed to deactivate users.");
          }
        } catch (error: unknown) {
          console.error("Error deactivating users:", error);
          if (error instanceof Error) {
            setError("Failed to deactivate users: " + error.message);
          } else {
            setError("Failed to deactivate users: An unknown error occurred.");
          }
        }
      } else {
        alert("Please select users to deactivate.");
      }
    }
    setBulkAction("Bulk Action");
  };

  const isAllCurrentUsersSelected = currentUsers.every((user) => selectedUsers.includes(user._id));


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
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleBulkAction} disabled={selectedUsers.length === 0 && bulkAction !== "Bulk Action"}>
            Apply
          </Button>
        </div>

        <div className="flex items-center gap-2">
        <Input
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="max-w-sm"
/>

          <Button className="bg-blue-500 hover:bg-blue-600" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>
      </div>

      {error && <div className="p-4 mb-4 text-red-500 bg-red-100 border border-red-400 rounded-md">{error}</div>}

      <div className="bg-white rounded-md border shadow-sm">
        {loading ? (
          <div className="p-4 text-center">Loading users...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={isAllCurrentUsersSelected}
                      onChange={handleBulkCheckboxChange}
                    />
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
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                      />
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