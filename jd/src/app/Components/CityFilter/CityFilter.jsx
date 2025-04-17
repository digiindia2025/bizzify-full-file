"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cityFilter.css";
import Link from "next/link";
import Heading from "../Heading/SecHeading";
import Image from "next/image";

export default function CityCards() {
  const [cityData, setCityData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/cities");
        const data = await res.json();
        console.log("Fetched cities:", data);

        // Assuming the response contains a 'cities' array
        setCityData(data?.cities || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <Heading title="Top Cities" subtitle="Businesses by city" />

      {/* TEMPORARY DEBUGGING */}
      {/* <pre>{JSON.stringify(cityData, null, 2)}</pre> */}

      <div className="container">
        <div className="row g-4">
          {cityData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            cityData.map((city) => {
              console.log("City:", city); // Debug: Check city object

              return (
                <div key={city._id} className="col-sm-4 col-6 col-md-3">
                  <div
                    className={`cityCard ${hoveredCard === city._id ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredCard(city._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ "--card-color": city.color }}
                  >
                    <div className="cardImageContainer">
                      <Image
                        src={city.image || "/default-image.jpg"} // Use fallback image if city image is missing
                        alt={`${city.name}, ${city.country}`}
                        className="cardImage"
                        width={300}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="cardOverlay"></div>
                    </div>
                      <div className="cardBadge">
                      <span>{city.badge || "New"}</span>
                      </div>
                    <div className="cardContent">
                      <div className="cardHeader">
                        <h2 className="cityName">{city.name}</h2>
                        <p className="countryName">{city.country}</p>
                      </div>
                      <div className="cardFooter">
                        <Link href="/pages/cityTourismGuide">
                          <button className="exploreButton">
                            <i className="bi bi-geo-alt me-1"></i>
                            <span>Explore</span>
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="cardDecoration"></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
