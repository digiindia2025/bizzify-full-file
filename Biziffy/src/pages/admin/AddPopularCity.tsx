import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const AddPopularCity = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "India",
    badge: "",
    image: "",
    color: "#6E59A5",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // VITE_API_BASE_URL=http://localhost:5000/api/admin/cityRoutes1/add-multiple
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting data:", formData);

      const res = await axios.post(
        "http://localhost:5000/api/admin/cityRoutes1/add-multiple",
        formData
        
      );

      toast({
        title: "Success",
        description: "City added successfully!",
      });
      navigate("/admin/popular-cities");
    } catch (error) {
      console.error("Error adding city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add city. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New City">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin/popular-cities")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Popular City</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">City Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge">Badge</Label>
                  <Input id="badge" name="badge" value={formData.badge} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" name="image" value={formData.image} onChange={handleChange} />
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
                      className="h-10 w-10 border rounded"
                    />
                    <Input name="color" value={formData.color} onChange={handleChange} />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/popular-cities")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddPopularCity;
