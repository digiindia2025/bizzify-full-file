
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
// import { getCollectionById, updateCollection } from "@/backend/api/routes/collections";
import { ArrowLeft } from "lucide-react";

const EditCollection = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    image: "",
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      if (!id) return;
      
      try {
        const collection = await getCollectionById(id);
        if (collection) {
          setFormData({
            name: collection.name,
            description: collection.description || "",
            icon: collection.icon || "",
            image: collection.image || "",
            isActive: collection.isActive
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collection details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load collection details. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setLoading(true);

    try {
      await updateCollection(id, formData);
      navigate("/admin/collections");
    } catch (error) {
      console.error("Error updating collection:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update collection. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Collection">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-xl">Loading collection details...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Collection">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin/collections")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Collection: {formData.name}</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Collection Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter collection name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon (URL or name)</Label>
                  <Input 
                    id="icon" 
                    name="icon" 
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="Icon name or URL"
                  />
                  <p className="text-xs text-gray-500">
                    Optional icon for the collection
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter collection description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/collection-image.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Add a URL for the collection image
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    name="isActive" 
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/collections")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Collection"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditCollection;