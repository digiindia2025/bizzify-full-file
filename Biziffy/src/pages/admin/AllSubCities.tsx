
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MapPin, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface SubCity {
  _id: string;
  name: string;
  parentCity: string;
  parentCityId: string;
  image: string;
  isActive: boolean;
}

const AllSubCities = () => {
  const [subCities, setSubCities] = useState<SubCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubCities = async () => {
      try {
        // Simulate API call for now
        setTimeout(() => {
          const mockSubCities = [
            {
              _id: '1',
              name: 'Brooklyn',
              parentCity: 'New York',
              parentCityId: '1',
              image: '/placeholder.svg',
              isActive: true
            },
            {
              _id: '2',
              name: 'Manhattan',
              parentCity: 'New York',
              parentCityId: '1',
              image: '/placeholder.svg',
              isActive: true
            },
            {
              _id: '3',
              name: 'Westminster',
              parentCity: 'London',
              parentCityId: '2',
              image: '/placeholder.svg',
              isActive: true
            }
          ];
          
          setSubCities(mockSubCities);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching subcities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load subcities. Please try again later.",
        });
        setLoading(false);
      }
    };

    fetchSubCities();
  }, [toast]);

  const handleDelete = (id: string) => {
    // In a real app, make an API call to delete the subcity
    setSubCities(subCities.filter(subCity => subCity._id !== id));
    toast({
      title: "Sub City Deleted",
      description: "The sub city has been successfully deleted.",
    });
  };

  const filteredSubCities = subCities.filter(subCity => 
    subCity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subCity.parentCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="All Sub Cities">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sub Cities Management</h1>
          <Link to="/admin/subcities/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Sub City
            </Button>
          </Link>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search sub cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[200px] bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubCities.length > 0 ? (
              filteredSubCities.map(subCity => (
                <Card key={subCity._id} className="overflow-hidden">
                  <div 
                    className="h-[120px] bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${subCity.image || '/placeholder.svg'})`,
                    }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{subCity.name}</CardTitle>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {subCity.parentCity}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Link to={`/admin/subcities/edit/${subCity._id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(subCity._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${subCity.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {subCity.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No sub cities found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllSubCities;