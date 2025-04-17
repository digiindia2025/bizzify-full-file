import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";


import gradientClasses from "../data/gradientClasses";
import dashboardCardTemplates from "../data/dashboardCards";
import { toast } from "@/components/ui/use-toast";

// Define or import the DashboardCardTemplate type
type DashboardCardTemplate = {
  key: string;
  title: string;
  linkTo: string;
};

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    listings: 0,
    advertisements: 0,
    users: 0,
    categories: 0,
    subcategories: 0,
    // childCategories: 0,
    contacts: 0,
    supports: 0,
    enquiries: 0,
    links: 0,
    reviews: 0,
    memberships: 0,
  });
  const [customCards, setCustomCards] = useState<DashboardCardTemplate[]>([]);
  
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const endpoints = [
          "listings",
          "advertisements",
          "users",
          "categories",
          "subcategories",
          "child-categories",
          "contact-us",
          "supports",
          "enquiries",
          "links",
          "reviews",
          "memberships",
        ];

        const responses = await Promise.all(
          endpoints.map((e) => fetch(`/api/admin/${e}/count`))
        );
        const data = await Promise.all(responses.map((r) => r.json()));

        setDashboardData({
          listings: data[0].count,
          advertisements: data[1].count,
          users: data[2].count,
          categories: data[3].count,
          subcategories: data[4].count,
          // childCategories: data[5].count,
          contacts: data[6].count,
          supports: data[7].count,
          enquiries: data[8].count,
          links: data[9].count,
          reviews: data[10].count,
          memberships: data[11].count,
        });
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
      }
    };

    fetchDashboardCounts();
  }, []);

  const dashboardCards = dashboardCardTemplates.map((tpl) => ({
    ...tpl,
    count: dashboardData[tpl.key] || 0,
    linkText: "View",
  }));

  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardsPerPage = isMobile ? 6 : 24;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const paginatedCards = isMobile
    ? filteredCards.slice(0, 9)
    : filteredCards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
      );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // reset to first page when searching
  };

  return (
    <AdminLayout title="" onSearch={handleSearch}>
      {/* mb -0 ka matlab hai ham dashboard aur sabse uper rakh rhe hai navbar ke karib */}

      <div className="mb-0 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold hidden md:block"></h1>
      </div>
      
      {/* <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
  <h1 className="text-2xl font-bold hidden md:block"></h1> */}

  {/* <Link to="/admin/DashboardManager">
    <Button variant="outline" className="flex items-center gap-2">
      <span>Manage Dashboard</span>
      <Settings className="w-4 h-4" />
    </Button>
  </Link> */}
{/* </div> */}


      <div className="grid gap-4 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {paginatedCards.map((card, idx) => (
          <Card
            key={idx}
            className={`admin-card h-[180px] md:h-[180px] h-[170px] sm:w-[250px] md:w-[300px] lg:w-[180px] rounded-2xl 
              transform transition duration-300 hover:scale-105 
              text-white ${gradientClasses[
                (idx + (currentPage - 1) * cardsPerPage) % gradientClasses.length
              ]}
            `}
          >
            <CardContent className="p-4 flex flex-col justify-between text-center h-full w-full">
              <div>
                <span className="text-2xl font-bold block">{card.count}</span>
                <h3 className="text-base font-semibold mt-2 truncate">{card.title}</h3>
              </div>

              <Link to={card.linkTo} className="w-full">
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold text-sm transition duration-200 mt-4">
                  {card.linkText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (!isMobile) return true;
            return (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            );
          })
          .map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
