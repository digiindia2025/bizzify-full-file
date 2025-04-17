
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
// import { Deal, getAllDeals, deleteDeal } from "@/backend/api/routes/deals";
import { useToast } from "@/components/ui/use-toast";

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getAllDeals();
        setDeals(data);
        setFilteredDeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load deals. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchDeals();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDeals(
        deals.filter(deal => 
          deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDeals(deals);
    }
  }, [searchTerm, deals]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteDeal(id);
        setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
      } catch (error) {
        console.error("Error deleting deal:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete deal. Please try again.",
        });
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/deals/edit/${id}`);
  };

  return (
    <AdminLayout title="Deals and Offers">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Deals and Offers</h1>
          <Button onClick={() => navigate("/admin/deals/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Deal
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <CardTitle>All Deals</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search deals..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading deals...</div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead className="w-[100px] text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeals.length > 0 ? (
                      filteredDeals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell className="font-medium">{deal.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{deal.name}</div>
                          </TableCell>
                          <TableCell>{deal.provider}</TableCell>
                          <TableCell>{deal.discount || "—"}</TableCell>
                          <TableCell>{deal.validUntil || "—"}</TableCell>
                          <TableCell className="text-center">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                deal.isActive 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {deal.isActive ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEdit(deal.id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(deal.id, deal.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No deals found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Deals;