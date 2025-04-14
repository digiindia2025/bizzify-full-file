import React from "react";
import "./blogpage.css";
import breadbg from "../../Images/bread.jpg";
import blogImage1 from "../../Images/blog1.jpg";
import blogImage2 from "../../Images/blog2.jpg";
import blogImage3 from "../../Images/blog3.jpg";
import blogImage4 from "../../Images/blog4.jpg";
import blogImage5 from "../../Images/blog5.jpg";
import Head from "next/head";

import Image from "next/image";
import Link from "next/link";
const page = () => {
  const blogs = [
    {
      id: 1,
      title: "Professional Photoshoot Services",
      description:
        "High-quality images enhance brand presence and credibility.",
      image: blogImage1,
    },
    {
      id: 2,
      title: "Website & App Development",
      description:
        "A well-developed platform improves user experience and customer retention.",
      image: blogImage2,
    },
    {
      id: 3,
      title: "Creative Designing Services",
      description:
        "Strong visuals make brands stand out and boost recognition.",
      image: blogImage3,
    },
    {
      id: 4,
      title: "Digital Marketing Solutions",
      description:
        "SEO and social media marketing increase brand awareness and sales.",
      image: blogImage4,
    },
    {
      id: 5,
      title: "Content Creation & Branding",
      description:
        "Engaging content builds trust and strengthens brand identity.",
      image: blogImage5,
    },
  ];
  return (
    <>
      <Head>
        <title>
          Biziffy Blog - Business Growth, SEO, Marketing & Digital Tips
        </title>
        <meta
          name="description"
          content="Read expert blogs on business growth, digital marketing, SEO strategies, lead generation, and success stories. Stay updated with Biziffy insights."
        />
        <meta
          name="keywords"
          content="Biziffy blog, business blog, digital marketing tips, SEO blog, online business growth, lead generation strategies, content marketing, small business blog, B2B marketing, business visibility, local business growth, listing strategies, free business promotion, social media tips, search engine optimization, ranking on Google, online advertising, blog for startups, blogging for entrepreneurs, business strategy blog, customer acquisition, business tips India, how to get leads online, increase website traffic, business automation, CRM, sales funnel, business branding, lead capture, marketing tools, digital business solutions, startup advice, online business directory, business blog India, marketing growth hacks, web presence, business awareness blog, bizify articles, entrepreneur success blog"
        />
        <meta
          property="og:title"
          content="Biziffy Blog - Business & Marketing Insights"
        />
        <meta
          property="og:description"
          content="Explore expert articles from Biziffy on how to grow your business, improve online visibility, and generate leads effectively."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biziffy.com/blog" />
        <meta property="og:site_name" content="Biziffy Blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Biziffy Blog - Boost Your Business with Expert Tips"
        />
        <meta
          name="twitter:description"
          content="Stay updated with Biziffy’s blog on business tips, SEO, lead generation, and marketing strategies."
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>
      <section>
        <div className="all-breadcrumb">
          <Image
            src={breadbg}
            alt="Breadcrumb Background"
            layout="fill"
            objectFit="cover"
          />
          <div className="bread-overlay"></div>{" "}
          {/* Overlay should be separate */}
          <div className="container">
            <div className="bread-content">
              <h1>Stay Update With Trending Business Ideas 💡</h1>
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol>
                  <li>
                    <Link href="/" className="hover:text-blue-500">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="bi bi-chevron-double-right"></i>
                  </li>
                  <li style={{ color: "var(--blue)" }}>Blog</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-main">
        <div className="container">
          <div className="row">
            {blogs.map((blog, index) => (
              <div key={index} className="col-md-4 gy-3">
                <div className="blog-card card">
                  <Image
                    src={blog.image}
                    className="blog-card-img"
                    alt={blog.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <Link
                      href={`../../Pages/blog/${blog.id}`}
                      className="login-btn"
                    >
                      Read More <i className="bi bi-arrow-right-circle "></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
