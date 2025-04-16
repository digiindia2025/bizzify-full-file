"use client";
import React, { useState, useEffect } from "react";
import "./BussinessCategory.css";
import Heading from "../Heading/SecHeading";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";  

/**
 * @typedef {Object} Category
 * @property {string} _id - The unique identifier for the category.
 * @property {string} name - The name of the category.
 * @property {string} [icon] - The optional icon URL for the category.
 * @property {string} [slug] - The optional slug for the category.
 * 
 */

const BussinessCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const res = await axios.get("http://localhost:5000/api/categories");
        console.log("data",res.data);
        
        setCategories(res.data); // Assuming res.data is the array of categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    console.log("Loading state:", loading);
    return <div>Loading business categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Heading
        title="Top Business Categories"
        subtitle="Businesses by category"
      />
      
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            
            <div key={category._id} className="col-lg-2 col-md-3 col-sm-4 col-4">
              <Link
                href={`/Pages/subCategoryFilter?category=${category?.name}`} // Use category.slug if available
                alt={category?.name}
                className="text-decoration-none"
              >
                <div className="bussiness-category-card text-center p-3">
                  {category.icon && (
                    <Image
                      src={`http://localhost:5000/uploads/${category.icon}` || " "} // Use category.icon if available, otherwise use category.icon}
                      alt={category.name}
                      width={50}
                      height={50}
                      onError={(e) => {
                        e.currentTarget.src = "/path/to/default-category-image.png";
                      }}
                    />
                    
                  )}
                  {!category.icon && (
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {category.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <h6 className="mt-2">{category.name}</h6>
                </div>
              </Link>
            </div>
          ))}
          {/* <div className="d-flex justify-content-center mt-3">
            <Link className="login-btn" href="../../Pages/all-categories">
              View All <i className="bi bi-eye"></i>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BussinessCategory;