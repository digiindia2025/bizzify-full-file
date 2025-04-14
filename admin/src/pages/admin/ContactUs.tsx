import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import axios from "axios";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  state?: string;
  city?: string;
  services?: string;
  createdAt: string;
}

const ContactUs = () => {
  const { toast } = useToast();
  const [contactData, setContactData] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 4;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/contacts");
        setContactData(res.data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load contacts from server.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contactData.filter((contact) =>
    Object.values(contact).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleExportToCSV = () => {
    if (filteredContacts.length === 0) return;

    const csvHeader = Object.keys(filteredContacts[0]).join(",") + "\n";
    const csvRows = filteredContacts
      .map((contact) =>
        Object.values(contact)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();

    toast({ title: "Exported", description: "Contacts exported to CSV successfully!" });
  };

  return (
    <AdminLayout title="Contact Us">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="relative w-full sm:w-72">
          <Input
            type="text"
            placeholder="Search contact..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600">All Contact Us</Button>
          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading contacts...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["First Name", "Last Name", "Email", "Phone", "Message", "State", "City", "Services", "Created At"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentContacts.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{contact.message}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.state || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.city || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.services || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(contact.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 flex-wrap gap-2">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
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

            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default ContactUs;
