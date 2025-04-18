import { useEffect, useState } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eye, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { toast } from "@/components/ui/use-toast";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FullListing {
  businessId: string;
  businessDetails?: {
    _id: string;
    businessName?: string;
    pinCode?: string;
    building?: string;
    street?: string;
    area?: string;
    landmark?: string;
    city?: string;
    state?: string;
    direction?: string;
    website?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    category?: string;
    userId?: string;
    publishedDate?: string;
    status?: string;
    businessStatus?: string;
    trustStatus?: string;
    phon?: string;
  };
  timings: {
    open: string;
    close: string;
    days: string[];
  };
  contact: {
    phone: string;
    email: string;
  };
  upgrade: {
    plan: string;
    expiryDate: string;
  };
}

export const AllListings = () => {
  const [fullListings, setFullListings] = useState<FullListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState("Bulk Action");
  const [selectedListingIds, setSelectedListingIds] = useState<string[]>([]);

// this for pagination

  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;

  const [editingPublishStatusId, setEditingPublishStatusId] = useState<string | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [publishStatusOptions] = useState(["Pending", "Published", "Unpublished"]);
  const [statusOptions] = useState(["Pending", "Approved", "Rejected"]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFullListings();
  }, [currentPage]);

  const fetchFullListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/getAllFullListings`, 
      );
      setFullListings(res.data || []);
      setTotalPages(Math.ceil((res.data?.length || 0) / listingsPerPage) || 1);
    } catch (err: unknown) {
      console.error("Failed to fetch full listings", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch listings");
      }
      setFullListings([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = fullListings.filter((listing) => {
    const query = searchQuery.toLowerCase();
    const details: NonNullable<FullListing["businessDetails"]> = listing.businessDetails || { _id: "" };
    return (
      details.businessName?.toLowerCase().includes(query) ||
      details.category?.toLowerCase().includes(query) ||
      details.userId?.toLowerCase().includes(query) ||
      details.createdAt?.toLowerCase().includes(query) ||
      details.publishedDate?.toLowerCase().includes(query) ||
      details.status?.toLowerCase().includes(query) ||
      details.businessStatus?.toLowerCase().includes(query) ||
      details.trustStatus?.toLowerCase().includes(query)
    );
  });

  const currentListings = filteredListings;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleBulkAction = async () => {
    if (selectedAction === "Bulk Action" || selectedListingIds.length === 0) return;

    try {
      await axios.post(`http://localhost:5000/api/admin/listings/bulk-action`, {
        ids: selectedListingIds,
        action: selectedAction,
      });
      fetchFullListings();
      setSelectedListingIds([]);
      setSelectedAction("Bulk Action");
    } catch (error) {
      console.error(`Failed to ${selectedAction} listings`, error);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedListingIds.includes(id)) {
      setSelectedListingIds(selectedListingIds.filter((item) => item !== id));
    } else {
      setSelectedListingIds([...selectedListingIds, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedListingIds(currentListings.map((listing) => listing.businessId));
    } else {
      setSelectedListingIds([]);
    }
  };

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase() === "unpublish" ? "pending" : status?.toLowerCase();    const displayStatus = normalized === "unpublish" ? "pending" : normalized;
    switch (displayStatus) {
      case "approved":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Approved</span>;
      case "pending":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      case "rejected":
        return <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">Rejected</span>;
      default:
        return <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getBusinessTrustStatus = (status: string) => {
    const normalized = status.toLowerCase();
    const color = normalized === "approved" ? "bg-blue-600" : "bg-red-600";
    return (
      <span className={`px-2 py-1 text-xs ${color} text-white rounded-md`}>
        {status} Business Status
      </span>
    );
  };

  const getTrustStatus = (status: string) => {
    const normalized = status.toLowerCase();
    const color = normalized === "approved" ? "bg-green-600" : "bg-yellow-600";
    return (
      <span className={`px-2 py-1 text-xs ${color} text-white rounded-md`}>
        {status} Trust Status
      </span>
    );
  };

  const handleUpdatePublishStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/listings/publish-status/${id}`, { status: newStatus });
  
      setFullListings(fullListings.map((listing) =>
        listing.businessId === id && listing.businessDetails
          ? { ...listing, businessDetails: { ...listing.businessDetails, publishedDate: newStatus } }
          : listing
      ));
      setEditingPublishStatusId(null);
    } catch (error) {
      console.error("Failed to update publish status", error);
    }
  };
  

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/update-business-listing/${id}`, { status: newStatus });
      setFullListings(fullListings.map((listing) => {
        if (listing.businessId === id && listing.businessDetails) {
          return {
            ...listing,
            businessDetails: {
              ...listing.businessDetails,
              status: newStatus,
              businessStatus: newStatus === "Approved" ? "Approved" : "Not Approved",
              trustStatus: newStatus === "Approved" || newStatus === "Pending" ? "Approved" : "Not Approved",
            },
          };
        }
        return listing;
      }));
      setEditingStatusId(null);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/listing/${id}`);
      console.log("Delete Response: ", response.data);
      fetchFullListings(); 
    } catch (error) {
      console.error("Delete failed: ", error.response ? error.response.data : error.message);
    }
  };
  
  
  
  
  const csvData = filteredListings.map(listing => ({
    ID: listing.businessId,
    Title: listing.businessDetails?.businessName,
    Category: listing.businessDetails?.category,
    User: listing.businessDetails?.userId,
    CreatedDate: listing.businessDetails?.createdAt,
    PublishedDate: listing.businessDetails?.publishedDate,
    Status: listing.businessDetails?.status,
    BusinessStatus: listing.businessDetails?.businessStatus,
    TrustStatus: listing.businessDetails?.trustStatus,
    Timings: JSON.stringify(listing.timings),
    Contact: JSON.stringify(listing.contact),
    Upgrade: JSON.stringify(listing.upgrade),
  }));

  if (loading) {
    return <AdminLayout title=""><div>Loading listings...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title=""><div className="text-red-500">Error loading listings: {error}</div></AdminLayout>;
  }

  return (
    <AdminLayout title="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All User Listings</h1>
      </div>

      {/* Bulk Actions + Search/Export */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
           <select
            className="px-4 py-2 border rounded-md"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option>
          </select> 
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleBulkAction} disabled={selectedListingIds.length === 0}>
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
  <Input
    type="text"
    placeholder="Search"
    className="w-40 md:w-64"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <CSVLink
    data={csvData}
    filename="listings.csv"
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm text-center w-28 sm:w-auto"
  >
    Export to CSV
  </CSVLink>

</div>
      </div>

      <div className="bg-white rounded-md border shadow-sm mt-4">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px]">
          <input
            type="checkbox"
            className="h-4 w-4"
            onChange={handleSelectAll}
            checked={
              currentListings.length > 0 &&
              selectedListingIds.length === currentListings.length
            }
          />
        </TableHead>
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>User Name</TableHead>
        <TableHead>Created Date</TableHead>
        <TableHead>Published Date</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {currentListings.map((listing) => (
        <TableRow key={listing.businessId}>
          <TableCell>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={selectedListingIds.includes(listing.businessId)}
              onChange={() => handleCheckboxChange(listing.businessId)}
            />
          </TableCell>
          <TableCell>{listing.businessId}</TableCell>
          <TableCell>{listing.businessDetails?.businessName}</TableCell>
          <TableCell>{listing.businessDetails?.category}</TableCell>
          <TableCell>{listing.businessDetails?.userId}</TableCell>
          <TableCell>{listing.businessDetails?.createdAt}</TableCell>
          <TableCell>
            {editingPublishStatusId === listing.businessId ? (
              <select
                className="px-2 py-1 border rounded-md"
                value={listing.businessDetails?.publishedDate || "Pending"}
                onChange={(e) =>
                  handleUpdatePublishStatus(listing.businessId, e.target.value)
                }
                onBlur={() => setEditingPublishStatusId(null)}
                autoFocus
              >
                {publishStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2">
                {listing.businessDetails?.publishedDate || "Pending"}
                <button
                  onClick={() => setEditingPublishStatusId(listing.businessId)}
                  className="p-1 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-6 h-6 flex items-center justify-center"
                >
                  <Pencil className="w-3 h-3 text-orange-600" />
                </button>
              </div>
            )}
          </TableCell>
          <TableCell>
            {editingStatusId === listing.businessId ? (
              <select
                className="px-2 py-1 border rounded-md"
                value={listing.businessDetails?.status}
                onChange={(e) =>
                  handleUpdateStatus(listing.businessId, e.target.value)
                }
                onBlur={() => setEditingStatusId(null)}
                autoFocus
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2">
                {getStatusBadge(listing.businessDetails?.status || "Pending")}
                <button
                  onClick={() => setEditingStatusId(listing.businessId)}
                  className="p-1 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-6 h-6 flex items-center justify-center"
                >
                  <Pencil className="w-3 h-3 text-orange-600" />
                </button>
              </div>
            )}
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Link to={`/admin/listings/details/${listing.businessId}`}>
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteclick(listing.businessId)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>

              
              <div className="flex flex-col gap-1">
                {getBusinessTrustStatus(
                  listing.businessDetails?.businessStatus || "Not Approved"
                )}
                {getTrustStatus(
                  listing.businessDetails?.trustStatus || "Not Approved"
                )}
              </div>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
        
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
    {/* <Button
      size="sm"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button> */}

           {[...Array(totalPages)].map((_, i) => (
      <Button
        key={i}
        size="sm"
        variant={currentPage === i + 1 ? "default" : "outline"}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </Button>
         ))}
         {/* <Button
           size="sm"
           onClick={() => handlePageChange(currentPage + 1)}
           disabled={currentPage === totalPages}
         >
           Next
         </Button> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllListings;