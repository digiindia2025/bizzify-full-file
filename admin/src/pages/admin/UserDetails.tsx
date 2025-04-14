// UserDetails.tsx
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Deactivated";
  // You can add more fields here
  registrationDate?: string;
  lastLogin?: string;
  address?: string;
}

const mockUsers: UserData[] = [
  { id: 1, name: "Aman Tiwari", email: "amantiwari@gmail.com", phone: "9031359720", status: "Active", registrationDate: "2024-01-15", lastLogin: "2025-04-05 15:00", address: "123 Main St, Anytown" },
  { id: 2, name: "Gourav", email: "gourav@gmail.com", phone: "9031359720", status: "Inactive", registrationDate: "2023-11-20", lastLogin: "2024-12-25 10:30", address: "456 Oak Ave, Otherville" },
  { id: 3, name: "Vishnu", email: "Vishnu@gmail.com", phone: "9031359720", status: "Active", registrationDate: "2024-03-01", lastLogin: "2025-04-04 18:45", address: "789 Pine Ln, Anytown" },
  { id: 4, name: "Nitin", email: "nitin@gmail.com", phone: "9031359720", status: "Inactive", registrationDate: "2023-09-10", lastLogin: "2024-11-01 09:15", address: "101 Elm Rd, Otherville" },
  { id: 5, name: "Anjali Sharma", email: "anjali.sharma@example.com", phone: "9876543210", status: "Active", registrationDate: "2024-02-22", lastLogin: "2025-04-05 14:30", address: "222 Maple Dr, Anytown" },
  { id: 6, name: "Rohan Verma", email: "rohan.verma@sample.org", phone: "8765432109", status: "Inactive", registrationDate: "2023-12-05", lastLogin: "2025-01-01 12:00", address: "333 Willow Ct, Otherville" },
  { id: 7, name: "Priya Gupta", email: "priya.gupta@work.net", phone: "7654321098", status: "Active", registrationDate: "2024-04-10", lastLogin: "2025-04-03 20:00", address: "444 Birch St, Anytown" },
  { id: 8, name: "Kunal Singh", email: "kunal.singh@home.in", phone: "6543210987", status: "Inactive", registrationDate: "2023-10-18", lastLogin: "2024-11-30 16:15", address: "555 Cedar Blvd, Otherville" },
  { id: 9, name: "Sneha Patel", email: "sneha.patel@email.co", phone: "5432109876", status: "Active", registrationDate: "2024-01-28", lastLogin: "2025-04-05 11:45", address: "666 Oak St Ext, Anytown" },
  { id: 10, name: "Rajesh Yadav", email: "rajesh.yadav@data.com", phone: "4321098765", status: "Inactive", registrationDate: "2023-09-25", lastLogin: "2024-10-20 08:00", address: "777 Pine Ave, Otherville" },
  { id: 11, name: "Shweta Kumari", email: "shweta.kumari@info.biz", phone: "3210987654", status: "Active", registrationDate: "2024-03-15", lastLogin: "2025-04-04 07:30", address: "888 Elm St, Anytown" },
  { id: 12, name: "Vikram Mehra", email: "vikram.mehra@online.io", phone: "2109876543", status: "Inactive", registrationDate: "2023-11-01", lastLogin: "2024-12-10 19:00", address: "999 Maple Rd, Otherville" },
];

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulating API call (2 seconds delay)
    setTimeout(() => {
      const foundUser = mockUsers.find((u) => u.id === parseInt(userId || "", 10));
      if (foundUser) {
        setUser(foundUser);
        setLoading(false);
      } else {
        setError("User not found");
        setLoading(false);
      }
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <AdminLayout title="User Details">
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="User Details">
        <div>{error}</div>
        <Link to="/admin/users">
          <Button>Go Back</Button>
        </Link>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout title="User Details">
        <div>User not found</div>
        <Link to="/admin/users">
          <Button>Go Back</Button>
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`User Details - ${user.name}`}>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User Details</h1>
          <h2 className="text-lg text-gray-500">{user.name}</h2>
        </div>
        <Link to="/admin/users">
          <Button>Go Back</Button>
        </Link>
      </div>
      <div className="bg-white rounded-md border shadow-sm p-6 space-y-4">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Status:</strong> {user.status}</p>
        {user.registrationDate && <p><strong>Registration Date:</strong> {user.registrationDate}</p>}
        {user.lastLogin && <p><strong>Last Login:</strong> {user.lastLogin}</p>}
        {user.address && <p><strong>Address:</strong> {user.address}</p>}

        {/* You can display more information about the user here */}
      </div>

      <div className="mt-6 bg-white rounded-md border shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Actions</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
            Edit
          </Button>
          {user.status === "Active" ? (
            <Button variant="destructive">
              Deactivate
            </Button>
          ) : (
            <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
              Activate
            </Button>
          )}
          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;