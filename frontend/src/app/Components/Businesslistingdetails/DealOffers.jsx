import Link from "next/link";
import React from "react";
const DealOffers = () => {
  const data = {
    dealsAndOffers: [
      { name: "Kotak Mahindra Bank", link: "/deals/kotak-mahindra" },
      { name: "INOX Cinemas", link: "/deals/inox-cinemas" },
      { name: "Canara Bank", link: "/deals/canara-bank" },
      { name: "Pizza Hut Offers", link: "/deals/pizza-hut" },
      { name: "Amazon Discounts", link: "/deals/amazon" },
      { name: "Flipkart Sale", link: "/deals/flipkart" },
      { name: "Uber Coupons", link: "/deals/uber" },
      { name: "Zomato Gold", link: "/deals/zomato-gold" },
      { name: "Ola Cashback", link: "/deals/ola-cashback" },
      { name: "Paytm Offers", link: "/deals/paytm" },
      { name: "Swiggy Super Deals", link: "/deals/swiggy" },
      { name: "BookMyShow Combos", link: "/deals/bookmyshow" },
      { name: "Domino’s Deals", link: "/deals/dominos" },
      { name: "MakeMyTrip Offers", link: "/deals/makemytrip" },
      { name: "Cleartrip Discounts", link: "/deals/cleartrip" },
      { name: "RedBus Coupons", link: "/deals/redbus" },
      { name: "AirAsia Sales", link: "/deals/airasia" },
      { name: "BigBasket Offers", link: "/deals/bigbasket" },
      { name: "Myntra Mega Sale", link: "/deals/myntra" },
    ],

    jdCollections: [
      { name: "Travel & Tourism", link: "/collections/travel-tourism" },
      { name: "Beauty & Fashion", link: "/collections/beauty-fashion" },
      { name: "Health & Fitness", link: "/collections/health-fitness" },
      { name: "Home Services", link: "/collections/home-services" },
      { name: "Event Planners", link: "/collections/event-planners" },
      { name: "Education & Training", link: "/collections/education-training" },
      { name: "Automobile Services", link: "/collections/automobile" },
      { name: "Pet Care", link: "/collections/pet-care" },
      { name: "Repair Services", link: "/collections/repair" },
      { name: "Grocery & Essentials", link: "/collections/grocery" },
      { name: "Real Estate", link: "/collections/real-estate" },
      { name: "Interior Design", link: "/collections/interior-design" },
      { name: "Digital Marketing", link: "/collections/digital-marketing" },
      { name: "Freelancers & Consultants", link: "/collections/freelancers" },
      { name: "Restaurants & Cafes", link: "/collections/restaurants" },
    ],

    popularCities: [
      { name: "Delhi", link: "/city/delhi" },
      { name: "Mumbai", link: "/city/mumbai" },
      { name: "Bangalore", link: "/city/bangalore" },
      { name: "Hyderabad", link: "/city/hyderabad" },
      { name: "Ahmedabad", link: "/city/ahmedabad" },
      { name: "Pune", link: "/city/pune" },
      { name: "Chennai", link: "/city/chennai" },
      { name: "Kolkata", link: "/city/kolkata" },
      { name: "Surat", link: "/city/surat" },
      { name: "Jaipur", link: "/city/jaipur" },
      { name: "Lucknow", link: "/city/lucknow" },
      { name: "Bhopal", link: "/city/bhopal" },
      { name: "Indore", link: "/city/indore" },
      { name: "Nagpur", link: "/city/nagpur" },
      { name: "Patna", link: "/city/patna" },
      { name: "Chandigarh", link: "/city/chandigarh" },
      { name: "Coimbatore", link: "/city/coimbatore" },
      { name: "Goa", link: "/city/goa" },
      { name: "Visakhapatnam", link: "/city/visakhapatnam" },
    ],
  };

  return (
    <>
      <div className="container my-4">
        {/* Popular Cities */}
        <div className="mb-4">
          <h6 className="fw-bold">Popular Cities</h6>
          <div className="d-flex flex-wrap gap-2" style={{ fontSize: "14px" }}>
            {data.popularCities.map((item, index) => (
              <span key={index}>
                <Link
                  href={item.link}
                  className="text-decoration-none text-dark"
                >
                  {item.name}
                </Link>
                {index !== data.popularCities.length - 1 && (
                  <span className="mx-2 text-muted">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* JD Collections */}
        <div className="mb-4">
          <h6 className="fw-bold">Explore Biziffy Collections</h6>
          <div className="d-flex flex-wrap gap-2" style={{ fontSize: "14px" }}>
            {data.jdCollections.map((item, index) => (
              <span key={index}>
                <Link
                  href={item.link}
                  className="text-decoration-none text-dark"
                >
                  {item.name}
                </Link>
                {index !== data.jdCollections.length - 1 && (
                  <span className="mx-2 text-muted">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Deals and Offers */}
        <div className="mb-4">
          <h6 className="fw-bold">Deals and Offers</h6>
          <div className="d-flex flex-wrap gap-2" style={{ fontSize: "14px" }}>
            {data.dealsAndOffers.map((item, index) => (
              <span key={index}>
                <Link
                  href={item.link}
                  className="text-decoration-none text-dark"
                >
                  {item.name}
                </Link>
                {index !== data.dealsAndOffers.length - 1 && (
                  <span className="mx-2 text-muted">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DealOffers;
