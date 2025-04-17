
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

interface City {
  _id: string;
  name: string;
}

const EditSubCity = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    parentCityId: "",
    parentCityName: "",
    image: "",
    isActive: true
  });
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch parent cities for the dropdown
    const fetchCities = async () => {
      try {
        setTimeout(() => {
          setCities([
            { _id: '1', name: 'New York' },
            { _id: '2', name: 'London' },
            { _id: '3', name: 'Paris' }
          ]);
        }, 300);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load parent cities. Please try again.",
        });
      }
    };

    // Fetch subcity details
    const fetchSubCityDetails = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          // Mock data based on ID
          const mockSubCity = {
            _id: id,
            name: id === '1' ? 'Brooklyn' : id === '2' ? 'Manhattan' : 'Westminster',
            parentCityId: id === '1' || id === '2' ? '1' : '2',
            parentCityName: id === '1' || id === '2' ? 'New York' : 'London',
            image: '/placeholder.svg',
            isActive: true
          };

          setFormData(mockSubCity);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching subcity details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load subcity details. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchCities();
    if (id) {
      fetchSubCityDetails();
    }
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (value: string) => {
    const selectedCity = cities.find(city => city._id === value);
    setFormData(prev => ({
      ...prev,
      parentCityId: value,
      parentCityName: selectedCity?.name || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sub City Updated",
        description: `${formData.name} has been successfully updated.`,
      });
      
      navigate("/admin/subcities");
    } catch (error) {
      console.error("Error updating subcity:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update subcity. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Sub City">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-xl">Loading subcity details...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Sub City">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Edit Sub City: {formData.name}</h1>

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
                    placeholder="Enter subcity name"
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
                  <p className="text-xs text-gray-500">
                    The city this subcity belongs to
                  </p>
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
                    Add a URL for the subcity image
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
                  {loading ? "Updating..." : "Update Sub City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditSubCity;