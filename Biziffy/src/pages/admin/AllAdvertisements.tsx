import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Advertisement {
  _id: string;
  category: string;
  title: string;
  type: string;
  status: "Active" | "Inactive" | string;
  imageUrl: string;
}

const AllAdvertisements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchAdvertisements();
    fetchCategories();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get("/advertisements");
      setAdvertisements(response.data);
    } catch (error) {
      console.error("Failed to fetch advertisements", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      const categoryNames = response.data.map((cat: any) => cat.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const filteredAdvertisements = advertisements.filter((ad) => {
    const searchMatch = ad.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      filterCategory === "All" || ad.category === filterCategory;
    return searchMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredAdvertisements.length / itemsPerPage);
  const paginatedAds = filteredAdvertisements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
            Inactive
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
            {status}
          </span>
        );
    }
  };

  const handleDelete = async () => {
    if (!selectedAd) return;
    try {
      await axios.delete(`/advertisements/${selectedAd._id}`);
      setAdvertisements((prev) =>
        prev.filter((ad) => ad._id !== selectedAd._id)
      );
      toast.success("Advertisement deleted successfully");
      setShowDeleteDialog(false);
      setSelectedAd(null);
    } catch (err) {
      toast.error("Failed to delete advertisement");
    }
  };

  const handleEditStatus = async () => {
    if (!selectedAd) return;
    const updatedStatus =
      selectedAd.status === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(`/advertisements/${selectedAd._id}`, {
        ...selectedAd,
        status: updatedStatus,
      });
      setAdvertisements((prev) =>
        prev.map((ad) =>
          ad._id === selectedAd._id ? { ...ad, status: updatedStatus } : ad
        )
      );
      toast.success(`Status changed to ${updatedStatus}`);
      setSelectedAd(null);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleExportToCSV = () => {
    const csvRows = [
      ["ID", "Category", "Title", "Type", "Status"],
      ...filteredAdvertisements.map((ad) => [
        ad._id,
        ad.category,
        ad.title,
        ad.type,
        ad.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "advertisements.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Advertisements</h1>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border rounded-md text-sm">
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Activate">Activate</option>
            <option value="Deactivate">Deactivate</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
            Apply
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="text"
            placeholder="Search advertisements..."
            className="w-64 text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="px-3 py-2 border rounded-md text-sm w-48"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white text-sm"
            onClick={handleExportToCSV}
          >
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAds.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell>{ad._id}</TableCell>
                <TableCell>{ad.category}</TableCell>
                <TableCell>{ad.title}</TableCell>
                <TableCell>{ad.type}</TableCell>
                <TableCell>
                  <img
                    src={ad.imageUrl}
                    alt={`Ad ${ad._id}`}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{getStatusBadge(ad.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => setSelectedAd(ad)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogTitle className="text-lg font-semibold">
                          Edit Advertisement
                        </DialogTitle>
                        <div className="mt-2 text-sm text-gray-600">
                          Toggle the status of this advertisement below:
                        </div>
                        <div className="flex items-center justify-between mt-4 bg-gray-50 p-3 rounded-md border">
                          <span className="font-medium">
                            Current Status: {selectedAd?.status}
                          </span>
                          <Button
                            onClick={handleEditStatus}
                            className="text-sm"
                          >
                            {selectedAd?.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                        </div>
                        <DialogFooter className="mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedAd(null)}
                          >
                            Close
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={showDeleteDialog}
                      onOpenChange={setShowDeleteDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedAd(ad);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>
                          This action cannot be undone. Do you want to delete
                          this advertisement?
                        </p>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDelete}>
                            Yes, Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AllAdvertisements;
