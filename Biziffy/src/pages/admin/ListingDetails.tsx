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
  timings: Record<string, string | number | boolean>;
  contact: Record<string, string | number | boolean>;
  upgrade: Record<string, string | number | boolean>;
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
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/getAllFullListings/${id}`);
        setListing(res.data);
      } catch (err: unknown) {
        console.error("Error fetching listing:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListingDetails();
    } else {
      setError("Listing ID not found.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <AdminLayout title="Listing Details"><div>Loading listing details...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title="Listing Details"><div className="text-red-500">Error: {error}</div></AdminLayout>;
  }

  if (!listing || !listing.businessDetails) {
    return <AdminLayout title="Listing Details"><div>Listing not found.</div></AdminLayout>;
  }

  const { businessDetails } = listing;

  return (
    <AdminLayout title="Listing Details">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Business Details</h2>
        <Link to="/admin/listings">
          <Button className="bg-blue-500 hover:bg-blue-600">All Listings</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="font-medium">Business Name:</p><p>{businessDetails.businessName || "N/A"}</p></div>
              <div><p className="font-medium">Category:</p><p>{businessDetails.category || "N/A"}</p></div>
              <div><p className="font-medium">Phone:</p><p>{businessDetails.phone || "N/A"}</p></div>
              <div>
                <p className="font-medium">Hide Phone Number:</p>
                <input type="checkbox" checked={businessDetails.hidePhoneNumber || false} readOnly className="h-4 w-4" />
              </div>
              <div><p className="font-medium">Status:</p><p>{businessDetails.status || "N/A"}</p></div>
              <div><p className="font-medium">Business Status:</p><p>{businessDetails.businessStatus || "N/A"}</p></div>
              <div><p className="font-medium">Trust Status:</p><p>{businessDetails.trustStatus || "N/A"}</p></div>
              <div><p className="font-medium">View Count:</p><p>{businessDetails.viewCount || 0}</p></div>
              <div><p className="font-medium">Created At:</p><p>{businessDetails.createdAt ? new Date(businessDetails.createdAt).toLocaleDateString() : "N/A"}</p></div>
              <div><p className="font-medium">Updated At:</p><p>{businessDetails.updatedAt ? new Date(businessDetails.updatedAt).toLocaleDateString() : "N/A"}</p></div>
              {businessDetails.publishedDate && <div><p className="font-medium">Published Date:</p><p>{new Date(businessDetails.publishedDate).toLocaleDateString()}</p></div>}
            </div>
          </div>

          {/* Address Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="font-medium">Pin Code:</p><p>{businessDetails.pinCode || "N/A"}</p></div>
              <div><p className="font-medium">Building:</p><p>{businessDetails.building || "N/A"}</p></div>
              <div><p className="font-medium">Street:</p><p>{businessDetails.street || "N/A"}</p></div>
              <div><p className="font-medium">Area:</p><p>{businessDetails.area || "N/A"}</p></div>
              <div><p className="font-medium">Landmark:</p><p>{businessDetails.landmark || "N/A"}</p></div>
              <div><p className="font-medium">City:</p><p>{businessDetails.city || "N/A"}</p></div>
              <div><p className="font-medium">State:</p><p>{businessDetails.state || "N/A"}</p></div>
              <div><p className="font-medium">Country:</p><p>India</p></div>
              {businessDetails.direction && <div><p className="font-medium">Direction:</p><p>{businessDetails.direction}</p></div>}
              {businessDetails.website && (
                <div>
                  <p className="font-medium">Website:</p>
                  <Link to={businessDetails.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {businessDetails.website}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {businessDetails.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{businessDetails.description}</p>
            </div>
          )}

          {/* Additional Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><p className="font-medium">GST No:</p><p>{businessDetails.gstNo || "N/A"}</p></div>
              <div><p className="font-medium">CIN:</p><p>{businessDetails.cin || "N/A"}</p></div>
              <div><p className="font-medium">Entity:</p><p>{businessDetails.entity || "N/A"}</p></div>
            </div>
          </div>

          {/* User */}
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
          {businessDetails.services && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <p className="text-gray-700">{businessDetails.services}</p>
            </div>
          )}

          {/* Timings */}
          {listing.timings && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Timings</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{JSON.stringify(listing.timings, null, 2)}</pre>
            </div>
          )}

          {/* Contact */}
          {listing.contact && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{JSON.stringify(listing.contact, null, 2)}</pre>
            </div>
          )}

          {/* Upgrade */}
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
