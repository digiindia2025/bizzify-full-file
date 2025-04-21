"use client"; // Ensure it's client-side rendering
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for app router
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./subCategoryFilter.css";
import "../citytourismGuide/citytourismGuide.css";

const Page = () => {
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  // Only trigger useRouter after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = isClient ? useRouter() : null; // Ensure router is available on client side
  const { categoryId } = router?.query || {}; // Safely access categoryId

  useEffect(() => {
    if (!categoryId) return; // Prevent fetching if categoryId is not available

    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
        setCategory(response.data);
        setSubcategories(response.data.subcategories || []);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]); // Fetch when categoryId changes

  if (!categoryId) {
    return <div>Loading: categoryId is not available.
    </div>;
  }

  if (!category || subcategories.length === 0) {
    return <div>Loading category details...</div>;
  }

  return (
    <>
      <section>
        <div className="all-breadcrumb">
          {category?.bannerUrl ? (
            <Image
              src={category.bannerUrl}
              alt="Breadcrumb Background"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Image
              src="/images/default-banner.jpg"
              alt="Breadcrumb Background"
              layout="fill"
              objectFit="cover"
            />
          )}
          <div className="city-bread-overlay"></div>
          <div className="container">
            <div className="bread-content">
              <h1>{category?.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="subcategory-section">
        <div className="container">
          <div className="row justify-content-center">
            {subcategories.length > 0 ? (
              subcategories.map((sub) => (
                <div key={sub._id} className="col-md-3 col-sm-4 col-6">
                  <div className="subcategory-card">
                    <Link href={`/subcategory/${sub.name.toLowerCase().replace(/\s/g, "-")}`}>
                      <div className="subcategory-filter-img">
                        <Image
                          src={sub.imageUrl || "/images/default.jpg"}
                          alt={sub.name}
                          width={300}
                          height={200}
                        />
                      </div>
                    </Link>
                    <h4>{sub.name}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p>No subcategories available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
