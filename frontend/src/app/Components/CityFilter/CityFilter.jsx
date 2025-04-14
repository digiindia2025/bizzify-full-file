"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cityFilter.css";
import Link from "next/link";
import Heading from "../Heading/SecHeading";
import chennai from "../../Images/Chennai.jpg";
import delhi from "../../Images/Delhi.jpg";
import haryana from "../../Images/Haryana.avif";
import jaipur from "../../Images/Jaipur.webp";
import kolkata from "../../Images/kolkata.webp";
import mumbai from "../../Images/Mumbai.jpg";
import kerala from "../../Images/Kerala.jpg";
import karnataka from "../../Images/karnataka.jpg";
import Image from "next/image";

// Sample data for city cards
const cityData = [
  {
    id: 1,
    name: "JAIPUR",
    country: "INDIA",
    image: jaipur,
    color: "#ff6b6b",
  }, // Red
  {
    id: 2,
    name: "HARYANA",
    country: "INDIA",
    image: haryana,
    color: "#1e90ff",
  }, // Blue
  {
    id: 3,
    name: "MUMBAI",
    country: "INDIA",
    image: mumbai,
    color: "#ffcc00",
  }, // Yellow
  {
    id: 4,
    name: "KOLKATA",
    country: "INDIA",
    image: kolkata,
    color: "#8a2be2",
  }, // Purple
  {
    id: 5,
    name: "DELHI",
    country: "INDIA",
    image: delhi,
    color: "#ff4500",
  }, // Orange
  {
    id: 6,
    name: "KERALA",
    country: "INDIA",
    image: kerala,
    color: "#008000",
  }, // Green
  {
    id: 7,
    name: "KARNATAKA",
    country: "INDIA",
    image: karnataka,
    color: "#ff1493",
  }, // Pink
  {
    id: 8,
    name: "CHENNAI",
    country: "INDIA",
    image: chennai,
    color: "#00ced1",
  }, // Turquoise
];

export default function CityCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>

      <Heading title="Top Cities" subtitle="Businesses by city" />
      <div className="container">
        <div className="row g-4">
          {cityData.map((city) => (
            <div key={city.id} className="col-sm-4 col-6 col-md-3">
              <div
                className={`cityCard ${hoveredCard === city.id ? "hovered" : ""
                  }`}
                onMouseEnter={() => setHoveredCard(city.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ "--card-color": city.color }}
              >
                <div className="cardImageContainer">
                  <Image
                    src={city.image}
                    alt={`${city.name}, ${city.country}`}
                    className="cardImage"
                  />
                  <div className="cardOverlay"></div>
                </div>

                <div className="cardContent">
                  <div className="cardHeader">
                    <h2 className="cityName">{city.name}</h2>
                    <p className="countryName">{city.country}</p>
                  </div>
                  <div className="cardFooter">
                    <Link href="/Pages/citytourismGuide">
                      <button className="exploreButton">
                        <i className="bi bi-geo-alt me-1"></i>
                        {/* <MapPin size={16} /> */}
                        <span>Explore</span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="cardDecoration"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
