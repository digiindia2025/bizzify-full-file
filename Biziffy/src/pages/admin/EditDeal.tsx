
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
// import { getDealById, updateDeal } from "@/backend/api/routes/deals";
import { ArrowLeft } from "lucide-react";

const EditDeal = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    provider: "",
    discount: "",
    validUntil: "",
    couponCode: "",
    image: "",
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDealDetails = async () => {
      if (!id) return;
      
      try {
        const deal = await getDealById(id);
        if (deal) {
          setFormData({
            name: deal.name,
            description: deal.description || "",
            provider: deal.provider,
            discount: deal.discount || "",
            validUntil: deal.validUntil || "",
            couponCode: deal.couponCode || "",
            image: deal.image || "",
            isActive: deal.isActive
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deal details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load deal details. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchDealDetails();
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
      await updateDeal(id, formData);
      navigate("/admin/deals");
    } catch (error) {
      console.error("Error updating deal:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update deal. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Deal">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-xl">Loading deal details...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Deal">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin/deals")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Deal: {formData.name}</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Deal Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter deal name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Provider/Company *</Label>
                  <Input 
                    id="provider" 
                    name="provider" 
                    value={formData.provider}
                    onChange={handleChange}
                    placeholder="Enter provider name"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter deal description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input 
                    id="discount" 
                    name="discount" 
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="e.g. 20%, ₹500 off, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input 
                    id="validUntil" 
                    name="validUntil" 
                    type="date"
                    value={formData.validUntil}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couponCode">Coupon Code</Label>
                  <Input 
                    id="couponCode" 
                    name="couponCode" 
                    value={formData.couponCode}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/deal-image.jpg"
                  />
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
                  onClick={() => navigate("/admin/deals")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Deal"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditDeal;