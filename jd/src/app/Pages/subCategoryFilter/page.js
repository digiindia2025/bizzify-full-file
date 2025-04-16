import React from "react";
import "./subCategoryFilter.css";
import "../citytourismGuide/citytourismGuide.css";
import breadbg from "../../Images/ResturantBanner.jpg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const page = () => {
  // Example category data. Ideally, this will come from an API or a static file.
  const categories = [
    {
      id: "1",
      name: "Chinese Foods",
      bannerImage: breadbg,
      subcategories: [
        { title: "Dim Sum", link: "/subcategory/dim-sum" },
        { title: "Noodles", link: "/subcategory/noodles" },
      ],
      image: "/images/ChinessResturant.jpg",
    },
    {
      id: "2",
      name: "South Indian Foods",
      bannerImage: breadbg,
      subcategories: [
        { title: "Idli", link: "/subcategory/idli" },
        { title: "Dosa", link: "/subcategory/dosa" },
      ],
      image: "/images/SouthIndiaFood.jpg",
    },
    // Add more categories here...
  ];

  return (
    <>
      <Head>
        <title>Find Top Businesses by Category | Biziffy</title>
        <meta name="description" content="Explore local businesses by category on Biziffy." />
        <meta name="keywords" content="business category filter, local services, list by category" />
        {/* Open Graph and Twitter Meta Tags... */}
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

            {categories.map((category) => (
              <div key={category.id} className="col-md-3 col-sm-4 col-6">
                <div className="city-category-select-data">
                  {/* Link to the category's subcategory listing */}
                  <Link href={`/subcategory-filter?categoryId=${category.id}`}>
                    <div className="subcategory-filter-img">
                      <Image src={category.image} alt={category.name} width={300} height={200} />
                    </div>
                  </Link>

                  <h4 className="subcategory-filter-title">{category.name}</h4>
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
