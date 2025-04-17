
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const CreateCity = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    badge: "",
    image: "",
    color: "#9b87f5",
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - would be replaced with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "City Created",
        description: `${formData.name}, ${formData.country} has been successfully created.`,
      });
      
      navigate("/admin/cities");
    } catch (error) {
      console.error("Error creating city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create city. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Create City">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Create New City</h1>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">City Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter city name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge">Badge Label</Label>
                  <Input 
                    id="badge" 
                    name="badge" 
                    value={formData.badge}
                    onChange={handleChange}
                    placeholder="e.g. Popular, New, Featured"
                  />
                  <p className="text-xs text-gray-500">
                    Optional: Display a special badge on this city
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Theme Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      id="color" 
                      name="color" 
                      value={formData.color}
                      onChange={handleChange}
                      className="w-12 h-9 p-1"
                    />
                    <Input 
                      type="text" 
                      value={formData.color}
                      onChange={handleChange}
                      name="color"
                      placeholder="#HEX Color"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/city-image.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Add a URL for the city image
                  </p>
                </div>

                <div className="flex items-center space-x-2 h-full">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    name="isActive" 
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/cities")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateCity;