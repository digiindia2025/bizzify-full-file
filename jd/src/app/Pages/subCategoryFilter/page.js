"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./subCategoryFilter.css";
import "../citytourismGuide/citytourismGuide.css";

const Page = () => {
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
        console.log("API Response:", response.data);

        setCategory(response.data);
        setSubcategories(response.data.subcategories || []);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  if (!categoryId) return <div>Loading: categoryId not available...</div>;
  if (!category) return <div>Loading category...</div>;

  return (
    <>
      <section>
        <div className="all-breadcrumb position-relative">
          <Image
            src={category?.bannerUrl || "/images/default-banner.jpg"}
            alt="Breadcrumb"
            layout="fill"
            objectFit="cover"
          />
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
