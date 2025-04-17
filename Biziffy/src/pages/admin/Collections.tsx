
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
// import { getAllCollections, deleteCollection } from "@/backend/api/routes/collections";

interface Collection {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}
import { useToast } from "@/components/ui/use-toast";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getAllCollections();
        setCollections(data);
        setFilteredCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load collections. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchCollections();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCollections(
        collections.filter(collection => 
          collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCollections(collections);
    }
  }, [searchTerm, collections]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteCollection(id);
        setCollections(prevCollections => prevCollections.filter(collection => collection.id !== id));
      } catch (error) {
        console.error("Error deleting collection:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete collection. Please try again.",
        });
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/collections/edit/${id}`);
  };

  return (
    <AdminLayout title="Collections">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Biziffy Collections</h1>
          <Button onClick={() => navigate("/admin/collections/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Collection
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <CardTitle>All Collections</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search collections..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading collections...</div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px] text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCollections.length > 0 ? (
                      filteredCollections.map((collection) => (
                        <TableRow key={collection.id}>
                          <TableCell className="font-medium">{collection.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{collection.name}</div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{collection.description || "—"}</TableCell>
                          <TableCell className="text-center">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                collection.isActive 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {collection.isActive ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEdit(collection.id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(collection.id, collection.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No collections found.
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

export default Collections;