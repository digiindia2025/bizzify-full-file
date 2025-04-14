"use client";
import React from "react";
import Image from "next/image";
import "./ServicesCategories.css";
import s1 from "../../Images/s1.jpg";
import Link from "next/link";
import Heading from "../Heading/SecHeading";


const ServicesCategories = () => {
  const categories = [
    {
      title: "Wedding Requisites",
      items: [
        {
          name: "Banquet Halls",
          image: s1,
          alt: "Elegant banquet hall with chandeliers",
        },
        {
          name: "Bridal Requisite",
          image: s1,
          alt: "Gold jewelry and accessories with red flowers",
        },
        {
          name: "Caterers",
          image: s1,
          alt: "Elegant table setting with wine glasses",
        },
      ],
    },
    {
      title: "Beauty & Spa",
      items: [
        {
          name: "Beauty Parlours",
          image: s1,
          alt: "Nail service being performed",
        },
        {
          name: "Spa & Massages",
          image: s1,
          alt: "Woman receiving facial massage",
        },
        { name: "Salons", image: s1, alt: "Woman having her hair styled" },
      ],
    },
    {
      title: "Repairs & Services",
      items: [
        {
          name: "AC Service",
          image: s1,
          alt: "Technician repairing air conditioner",
        },
        {
          name: "Car Service",
          image: s1,
          alt: "Mechanic repairing a blue car",
        },
        { name: "Bike Service", image: s1, alt: "Person repairing a bicycle" },
      ],
    },
    {
      title: "Daily Needs",
      items: [
        { name: "Movies", image: s1, alt: "Movie clapperboard with popcorn" },
        { name: "Grocery", image: s1, alt: "Basket full of groceries" },
        {
          name: "Electricians",
          image: s1,
          alt: "Electrician working on wiring",
        },
      ],
    },
  ];

  return (
    <>
      <Heading title="Top Services" subtitle="Services by category" />
      <div className="container">
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="sc-category-card">
                <h2 className="sc-category-title">{category.title}</h2>
                <div className="row g-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="col-4">
                      <div className="sc-service-item">
                        <Link href="#">
                          <div className="sc-image-container">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              className="sc-service-image"
                              layout="responsive"
                            />
                          </div>
                        </Link>

                        <p className="sc-service-name">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesCategories;
