
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface City {
  _id: string;
  name: string;
  country: string;
  badge?: string;
  image: string;
  color?: string;
  isActive: boolean;
}

const AllCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Simulate API call for now
        // Replace with actual API call when backend is ready
        setTimeout(() => {
          const mockCities = [
            {
              _id: '1',
              name: 'New York',
              country: 'United States',
              badge: 'Popular',
              image: '/placeholder.svg',
              color: '#6E59A5',
              isActive: true
            },
            {
              _id: '2',
              name: 'London',
              country: 'United Kingdom',
              badge: 'Featured',
              image: '/placeholder.svg',
              color: '#9b87f5',
              isActive: true
            },
            {
              _id: '3',
              name: 'Paris',
              country: 'France',
              badge: 'New',
              image: '/placeholder.svg',
              color: '#8B5CF6',
              isActive: true
            }
          ];
          
          setCities(mockCities);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cities. Please try again later.",
        });
        setLoading(false);
      }
    };

    fetchCities();
  }, [toast]);

  const handleDelete = (id: string) => {
    // In a real app, make an API call to delete the city
    setCities(cities.filter(city => city._id !== id));
    toast({
      title: "City Deleted",
      description: "The city has been successfully deleted.",
    });
  };

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="All Cities">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cities Management</h1>
          <Link to="/admin/cities/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New City
            </Button>
          </Link>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search cities..."
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
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <Card key={city._id} className="overflow-hidden">
                  <div 
                    className="h-[120px] bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${city.image || '/placeholder.svg'})`,
                      backgroundColor: city.color || '#f3f4f6'
                    }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{city.name}</CardTitle>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {city.country}
                        </p>
                      </div>
                      {city.badge && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {city.badge}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Link to={`/admin/cities/edit/${city._id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(city._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${city.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {city.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No cities found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllCities;