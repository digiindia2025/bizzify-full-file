import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface City {
  _id: string;
  name: string;
}

const CreateSubCity = () => {
  const [formData, setFormData] = useState({
    name: "",
    parentCityId: "",
    image: "",
    isActive: true
  });
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch parent cities
    const fetchCities = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCities([
            { _id: '1', name: 'New York' },
            { _id: '2', name: 'London' },
            { _id: '3', name: 'Paris' }
          ]);
        }, 500);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load parent cities. Please try again.",
        });
      }
    };

    fetchCities();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      parentCityId: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - would be replaced with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sub City Created",
        description: `${formData.name} has been successfully created.`,
      });
      
      navigate("/admin/subcities");
    } catch (error) {
      console.error("Error creating sub city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create sub city. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Create Sub City">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Create New Sub City</h1>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Sub City Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter sub city name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentCity">Parent City *</Label>
                  <Select 
                    value={formData.parentCityId} 
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger id="parentCity">
                      <SelectValue placeholder="Select a parent city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city._id} value={city._id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/subcity-image.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Add a URL for the sub city image
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
                  onClick={() => navigate("/admin/subcities")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Sub City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateSubCity;