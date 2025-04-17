
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditCity = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    badge: "",
    image: "",
    color: "#6E59A5",
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          // Simulating API response with mock data based on ID
          const mockCity = {
            _id: id,
            name: id === '1' ? 'New York' : id === '2' ? 'London' : 'Paris',
            country: id === '1' ? 'United States' : id === '2' ? 'United Kingdom' : 'France',
            badge: id === '1' ? 'Popular' : id === '2' ? 'Featured' : 'New',
            image: '/placeholder.svg',
            color: id === '1' ? '#6E59A5' : id === '2' ? '#9b87f5' : '#8B5CF6',
            isActive: true
          };

          setFormData(mockCity);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching city details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load city details. Please try again.",
        });
        setLoading(false);
      }
    };

    if (id) {
      fetchCityDetails();
    }
  }, [id, toast]);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "City Updated",
        description: `${formData.name} has been successfully updated.`,
      });
      
      navigate("/admin/cities");
    } catch (error) {
      console.error("Error updating city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update city. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit City">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-xl">Loading city details...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit City">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Edit City: {formData.name}</h1>

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
                    placeholder="Enter country"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge">Badge</Label>
                  <Input 
                    id="badge" 
                    name="badge" 
                    value={formData.badge}
                    onChange={handleChange}
                    placeholder="e.g. Popular, Featured, New"
                  />
                  <p className="text-xs text-gray-500">
                    Optional label that appears on the city card
                  </p>
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

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="h-10 w-10 border rounded p-1"
                    />
                    <Input 
                      value={formData.color}
                      onChange={handleChange}
                      name="color"
                      placeholder="#6E59A5"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Choose a color for the city card
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
                  {loading ? "Updating..." : "Update City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditCity;