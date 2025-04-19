import { useEffect, useState } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Interface for full listing response from backend
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
console.log("XXXXXXXXXXXXXXXXXXXXXXXXx",id)

const location = useLocation();

  const userData = location.state?.listingId;
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXx",userData)
  // Fetch listing details from backend on mount
  useEffect(() => {
    const fetchListingDetails = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getAllFullListings/${id}`
        );
        setListing(response.data);
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
      fetchListingDetails(id);
    } else {
      setError("Listing ID not found.");
      setLoading(false);
    }
  }, [id]);

  // Show loading UI
  if (loading) {
    return (
      <AdminLayout title="Listing Details">
        <div>Loading listing details...</div>
      </AdminLayout>
    );
  }

  // Show error if something went wrong
  if (error) {
    return (
      <AdminLayout title="Listing Details">
        <div className="text-red-500">Error: {error}</div>
      </AdminLayout>
    );
  }

  // If no data found
  if (!listing || !listing.businessDetails) {
    return (
      <AdminLayout title="Listing Details">
        <div>Listing not found.</div>
      </AdminLayout>
    );
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
          {/* === BASIC INFO === */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Business Name:</strong> {businessDetails.businessName || "N/A"}</div>
              <div><strong>Category:</strong> {businessDetails.category || "N/A"}</div>
              <div><strong>Phone:</strong> {businessDetails.phone || "N/A"}</div>
              <div>
                <strong>Hide Phone Number:</strong>
                <input
                  type="checkbox"
                  checked={businessDetails.hidePhoneNumber || false}
                  readOnly
                  className="ml-2 h-4 w-4"
                />
              </div>
              <div><strong>Status:</strong> {businessDetails.status || "N/A"}</div>
              <div><strong>Business Status:</strong> {businessDetails.businessStatus || "N/A"}</div>
              <div><strong>Trust Status:</strong> {businessDetails.trustStatus || "N/A"}</div>
              <div><strong>View Count:</strong> {businessDetails.viewCount || 0}</div>
              <div><strong>Created At:</strong> {businessDetails.createdAt ? new Date(businessDetails.createdAt).toLocaleDateString() : "N/A"}</div>
              <div><strong>Updated At:</strong> {businessDetails.updatedAt ? new Date(businessDetails.updatedAt).toLocaleDateString() : "N/A"}</div>
              <div><strong>Published Date:</strong> {businessDetails.publishedDate ? new Date(businessDetails.publishedDate).toLocaleDateString() : "N/A"}</div>
            </div>
          </div>

          {/* === ADDRESS INFO === */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Pin Code:</strong> {businessDetails.pinCode || "N/A"}</div>
              <div><strong>Building:</strong> {businessDetails.building || "N/A"}</div>
              <div><strong>Street:</strong> {businessDetails.street || "N/A"}</div>
              <div><strong>Area:</strong> {businessDetails.area || "N/A"}</div>
              <div><strong>Landmark:</strong> {businessDetails.landmark || "N/A"}</div>
              <div><strong>City:</strong> {businessDetails.city || "N/A"}</div>
              <div><strong>State:</strong> {businessDetails.state || "N/A"}</div>
              <div><strong>Country:</strong> India</div>
              <div><strong>Direction:</strong> {businessDetails.direction || "N/A"}</div>
              {businessDetails.website && (
                <div>
                  <strong>Website:</strong>{" "}
                  <a
                    href={businessDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {businessDetails.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* === DESCRIPTION === */}
          {businessDetails.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p>{businessDetails.description}</p>
            </div>
          )}

          {/* === ADDITIONAL DETAILS === */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Additional</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><strong>GST No:</strong> {businessDetails.gstNo || "N/A"}</div>
              <div><strong>CIN:</strong> {businessDetails.cin || "N/A"}</div>
              <div><strong>Entity:</strong> {businessDetails.entity || "N/A"}</div>
            </div>
          </div>

          {/* === USER INFO === */}
          {listing.user && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">User Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><strong>Name:</strong> {listing.user.name || "N/A"}</div>
                <div><strong>Email:</strong> {listing.user.email || "N/A"}</div>
                <div><strong>Phone:</strong> {listing.user.phone || "N/A"}</div>
                {listing.user.profileImage && (
                  <div>
                    <strong>Profile:</strong>
                    <img
                      src={listing.user.profileImage}
                      alt="User Profile"
                      className="w-24 h-24 mt-2 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === SERVICES === */}
          {businessDetails.services && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <p>{businessDetails.services}</p>
            </div>
          )}

          {/* === TIMINGS === */}
          {listing.timings && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Timings</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(listing.timings, null, 2)}
              </pre>
            </div>
          )}

          {/* === UPGRADE === */}
          {listing.upgrade && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Upgrade Information</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(listing.upgrade, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ListingDetails;
