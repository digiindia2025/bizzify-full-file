// frontend/src/components/Admin/ListingDetails.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";

interface FullListingDetails {
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
    phone?: string;
    hidePhoneNumber?: boolean;
    services?: string;
    viewCount?: number;
    description?: string;
    gstNo?: string;
    cin?: string;
    entity?: string;
  };
  timings: Record<string, string | number | boolean>; // Replace with the actual structure if known
  contact: Record<string, string | number | boolean>; // Replace with the actual structure if known
  upgrade: Record<string, string | number | boolean>; // Replace with the actual structure if known
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    profileImage?: string;
  };
}

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<FullListingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      setLoading(true);
      setError(null);
      if (id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/admin/business/listings/${id}`);
          console.log("Fetched Listing Details:", res.data);
          setListing(res.data);
        } catch (err: unknown) {
          console.error(`Failed to fetch listing details for ID: ${id}`, err);
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || err.message || "Failed to fetch listing details");
          } else {
            setError("An unexpected error occurred");
          }
          setListing(null);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Listing ID not provided in the URL.");
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  if (loading) {
    return <AdminLayout title="Listing Details"><div>Loading listing details...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title="Listing Details"><div className="text-red-500">Error loading listing details: {error}</div></AdminLayout>;
  }

  if (!listing) {
    return <AdminLayout title="Listing Details"><div>Listing not found.</div></AdminLayout>;
  }
console.log("listing value",listing);

  return (
    <AdminLayout title="Listing Details">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Bssiness Details</h2>
        {/* <Link to="/admin/all-listings">
          <Button className="bg-blue-500 hover:bg-blue-600">
            All Listings
          </Button>
        </Link> */}
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="font-medium">Business Name:</p><p>{listing?.businessName || "N/A"}</p></div>
              <div><p className="font-medium">Category:</p><p>{listing?.businessDetails?.category || "N/A"}</p></div>
              <div><p className="font-medium">Phone:</p><p>{listing?.phone || "N/A"}</p></div>
              <div>
                <p className="font-medium">Hide Phone Number:</p>
                <input
                  type="checkbox"
                  checked={listing.businessDetails?.hidePhoneNumber || false}
                  readOnly
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div><p className="font-medium">Status:</p><p>{listing?.status || "N/A"}</p></div>
              <div><p className="font-medium">Business Status:</p><p>{listing?.businessStatus || "N/A"}</p></div>
              <div><p className="font-medium">Trust Status:</p><p>{listing?.trustStatus || "N/A"}</p></div>
              <div><p className="font-medium">View Count:</p><p>{listing?.viewCount || 0}</p></div>
              <div><p className="font-medium">Created At:</p><p>{listing?.createdAt ? new Date(listing?.createdAt).toLocaleDateString() : "N/A"}</p></div>
              <div><p className="font-medium">Updated At:</p><p>{listing?.updatedAt ? new Date(listing?.updatedAt).toLocaleDateString() : "N/A"}</p></div>
              {listing?.publishedDate && <div><p className="font-medium">Published Date:</p><p>{new Date(listing?.publishedDate).toLocaleDateString()}</p></div>}
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="font-medium">Pin Code:</p><p>{listing?.pinCode || "N/A"}</p></div>
              <div><p className="font-medium">Building:</p><p>{listing?.building || "N/A"}</p></div>
              <div><p className="font-medium">Street:</p><p>{listing?.street || "N/A"}</p></div>
              <div><p className="font-medium">Area:</p><p>{listing?.area || "N/A"}</p></div>
              <div><p className="font-medium">Landmark:</p><p>{listing?.landmark || "N/A"}</p></div>
              <div><p className="font-medium">City:</p><p>{listing?.city || "N/A"}</p></div>
              <div><p className="font-medium">State:</p><p>{listing?.state || "N/A"}</p></div>
              <div><p className="font-medium">Country:</p><p>India</p></div> {/* Assuming country is always India */}
              {listing?.direction && <div><p className="font-medium">Direction:</p><p>{listing?.direction}</p></div>}
              {listing?.website && <div><p className="font-medium">Website:</p><Link to={listing?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{listing?.website}</Link></div>}
            </div>
          </div>

          {/* Description */}
          {listing.businessDetails?.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{listing.businessDetails.description}</p>
            </div>
          )}

          {/* Additional Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><p className="font-medium">GST No:</p><p>{listing?.gstNo || "N/A"}</p></div>
              <div><p className="font-medium">CIN:</p><p>{listing?.cin || "N/A"}</p></div>
              <div><p className="font-medium">Entity:</p><p>{listing?.entity || "N/A"}</p></div>
            </div>
          </div>

          {/* User Information */}
          {listing.user && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><p className="font-medium">Name:</p><p>{listing.user.name || "N/A"}</p></div>
                <div><p className="font-medium">Email:</p><p>{listing.user.email || "N/A"}</p></div>
                <div><p className="font-medium">Phone:</p><p>{listing.user.phone || "N/A"}</p></div>
                {listing.user.profileImage && (
                  <div>
                    <p className="font-medium">Profile Image:</p>
                    <img src={listing.user.profileImage} alt="User Profile" className="w-24 h-24 rounded-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services */}
          {listing.businessDetails?.services && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <p className="text-gray-700">{listing?.services}</p>
            </div>
          )}

          {/* Timings, Contact, Upgrade */}
          {listing.timings && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Timings</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{JSON.stringify(listing.timings, null, 2)}</pre>
            </div>
          )}

          {listing.contact && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{JSON.stringify(listing.contact, null, 2)}</pre>
            </div>
          )}

          {listing.upgrade && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Upgrade Information</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{JSON.stringify(listing.upgrade, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ListingDetails;