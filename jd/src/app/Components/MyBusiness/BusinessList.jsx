import React from "react";
import Image from "next/image";
import placeholderImg from "../../Images/LocalShops.webp";
import styles from "./BusinessList.module.css"; // Use CSS Module
import Link from "next/link";
const BusinessList = () => {
  const businesses = [
    {
      id: 1,
      name: "The Coffee House",
      category: "Café",
      address: "123 Brew Street, New Delhi",
      image: placeholderImg,
    },
    {
      id: 2,
      name: "Sparkle Salon",
      category: "Beauty & Wellness",
      address: "88 Glam Road, Mumbai",
      image: placeholderImg,
    },
    {
      id: 3,
      name: "TechFix Solutions",
      category: "Electronics Repair",
      address: "45 Circuit Lane, Bengaluru",
      image: placeholderImg,
    },
  ];

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-semibold text-dark">Your Listed Businesses</h3>
      {businesses.map((biz) => (
        <div
          className={`row ${styles.businessCard} align-items-center mb-4 p-3`}
          key={biz.id}
        >
          <div className="col-md-4 mb-3 mb-md-0">
            <div className={styles.imageWrapper}>
              <Image
                src={biz.image}
                alt={biz.name}
                layout="fill"
                objectFit="cover"
                className={styles.businessImage}
              />
            </div>
          </div>
          <div className="col-md-8">
            <h4 className={styles.businessTitle}>{biz.name}</h4>
            <p className="mb-1 text-muted">{biz.category}</p>
            <p className="mb-3 text-secondary">{biz.address}</p>
            <div>
              <Link href="/Pages/free-listing#paidlisting">
                <button className="login-btn me-2">Advertise Now</button>
              </Link>
              <Link href="/Pages/mybusiness/editmybusiness">
                <button className="black-btn">Edit Business</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
