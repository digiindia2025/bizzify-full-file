
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
// import { City, getAllCities, deleteCity } from "@/backend/api/routes/cities";
import { useToast } from "@/components/ui/use-toast";

const PopularCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data);
        setFilteredCities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cities. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchCities();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCities(
        cities.filter(city => 
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCities(cities);
    }
  }, [searchTerm, cities]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteCity(id);
        setCities(prevCities => prevCities.filter(city => city.id !== id));
      } catch (error) {
        console.error("Error deleting city:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete city. Please try again.",
        });
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/popular-cities/edit/${id}`);
  };

  return (
    <AdminLayout title="Popular Cities">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Popular Cities</h1>
          <Button onClick={() => navigate("/admin/popular-cities/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add New City
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <CardTitle>All Cities</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search cities..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading cities...</div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead className="w-[100px] text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell className="font-medium">{city.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{city.name}</div>
                          </TableCell>
                          <TableCell>{city.country}</TableCell>
                          <TableCell>{city.badge || "—"}</TableCell>
                          <TableCell className="text-center">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                city.isActive 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {city.isActive ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEdit(city.id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(city.id, city.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No cities found.
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

export default PopularCities;