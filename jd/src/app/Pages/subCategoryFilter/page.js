"use client";
import React, { useEffect, useState } from "react";
import "./subCategoryFilter.css";
import "../citytourismGuide/citytourismGuide.css";
import breadbg from "../../Images/ResturantBanner.jpg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

const Page = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/subcategories");
        setCategories(response.data.subcategories); // Assuming this is the response format
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Find Top Businesses by Category | Biziffy</title>
        <meta name="description" content="Explore local businesses by category on Biziffy." />
        <meta name="keywords" content="business category filter, local services, list by category" />
      </Head>

      <section>
        <div className="all-breadcrumb">
          <Image
            src={breadbg}
            alt="Breadcrumb Background"
            layout="fill"
            objectFit="cover"
          />
          <div className="city-bread-overlay"></div>
          <div className="container">
            <div className="bread-content">
              <h1>Crazy Delicious Awaits. Are You Ready?</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="citys-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="citys-section-head">
                <h1 className="citys-section-heading">
                  What are you looking for?
                </h1>
              </div>
            </div>

            {categories?.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="col-md-3 col-sm-4 col-6">
                  <div className="city-category-select-data">
                    <Link href={`/subcategory-filter?categoryId=${category._id}`}>
                      <div className="subcategory-filter-img">
                        <Image
                          src={category.imageUrl || "/images/default.jpg"}
                          alt={category.name}
                          width={300}
                          height={200}
                        />
                      </div>
                    </Link>

                    <h4 className="subcategory-filter-title">{category.name}</h4>

                    {category.mainSubCategories?.length > 0 && (
                      <div className="subcategory-list mt-2">
                        {category.mainSubCategories.map((sub, idx) => (
                          <div key={idx} className="subcategory-item">
                            <Link href={`/subcategory/${sub.name.toLowerCase().replace(/\s/g, "-")}`}>
                              {sub.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">No categories found.</p>
            )}

            <div className="text-center mt-4">
              <button className="btn btn-primary" type="button">
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
