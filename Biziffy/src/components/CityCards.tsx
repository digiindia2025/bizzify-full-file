
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

interface City {
  _id: string;
  name: string;
  country: string;
  badge?: string;
  image: string;
  color?: string;
}

interface CityCardsProps {
  title?: string;
  subtitle?: string;
}

export const CityCards: React.FC<CityCardsProps> = ({ 
  title = "Top Cities",
  subtitle = "Businesses by city"
}) => {
  const [cityData, setCityData] = useState<City[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // For demo purposes, using mock data
        // This would typically be replaced with an API call
        setTimeout(() => {
          const mockCities = [
            {
              _id: '1',
              name: 'New York',
              country: 'United States',
              badge: 'Popular',
              image: '/placeholder.svg',
              color: '#6E59A5'
            },
            {
              _id: '2',
              name: 'London',
              country: 'United Kingdom',
              badge: 'Featured',
              image: '/placeholder.svg',
              color: '#9b87f5'
            },
            {
              _id: '3',
              name: 'Paris',
              country: 'France',
              badge: 'New',
              image: '/placeholder.svg',
              color: '#8B5CF6'
            },
            {
              _id: '4',
              name: 'Tokyo',
              country: 'Japan',
              image: '/placeholder.svg',
              color: '#D946EF'
            }
          ];
          
          setCityData(mockCities);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-56 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cityData.map((city) => (
          <div
            key={city._id}
            className="relative group"
            onMouseEnter={() => setHoveredCard(city._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card 
              className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                hoveredCard === city._id ? 'transform scale-[1.02]' : ''
              }`}
            >
              <div
                className="h-48 relative"
                style={{
                  backgroundColor: city.color || '#f3f4f6',
                }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                {city.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800">
                      {city.badge}
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {city.country}
                  </p>
                </div>
                
                <Link to={`/cities/${city._id}`}>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    style={{
                      borderColor: city.color,
                      color: city.color
                    }}
                  >
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Decorative element */}
            <div 
              className={`absolute -z-10 bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                hoveredCard === city._id ? 'h-2' : ''
              }`}
              style={{ backgroundColor: city.color }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};