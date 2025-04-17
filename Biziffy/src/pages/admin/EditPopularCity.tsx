
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
// import { getCityById, updateCity } from "@/backend/api/routes/cities";
import { ArrowLeft } from "lucide-react";

const EditPopularCity = () => {
  const { id } = useParams<{ id: string }>();
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
      if (!id) return;
      
      try {
        const city = await getCityById(id);
        if (city) {
          setFormData({
            name: city.name,
            country: city.country,
            badge: city.badge || "",
            image: city.image || "",
            color: city.color || "#6E59A5",
            isActive: city.isActive
          });
        }
        setLoading(false);
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

    fetchCityDetails();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
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
      await updateCity(id, formData);
      navigate("/admin/popular-cities");
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
    <AdminLayout title="Edit Popular City">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin/popular-cities")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Popular City: {formData.name}</h1>
        </div>

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
                  onClick={() => navigate("/admin/popular-cities")}
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

export default EditPopularCity;