import React from "react";
import breadbg from "../../Images/HeroBanner.jpg";
import Image from "next/image";
import Link from "next/link";
import "./earnWithUs.css";
import EarnWithUs from "../../Images/EarnWithUs.png";
import Head from "next/head";

const page = () => {
  // ======= Who Can Earn Array =======================

  const Earnperson = [
    {
      id: 1,
      name: "Digital Marketing Agencies",
      image: EarnWithUs,
    },
    {
      id: 2,
      name: "Web Designer",
      image: EarnWithUs,
    },
    {
      id: 3,
      name: "Web Designer",
      image: EarnWithUs,
    },
    {
      id: 4,
      name: "Web Designer",
      image: EarnWithUs,
    },
  ];

  return (
    <>

<Head>
        <title>Earn With Us | Become a Partner & Grow with Biziffy</title>
        <meta
          name="description"
          content="Partner with Biziffy and earn by referring businesses, promoting listings, or becoming a sales associate. Start your earning journey with zero investment!"
        />
        <meta
          name="keywords"
          content="earn with Biziffy, Biziffy partner program, business partnership, referral program, sales associate opportunity, make money online, zero investment earning, earn by listing businesses, affiliate program India, passive income ideas, local business promotion, become a reseller, earn extra income, business collaboration, marketing partnership, grow with Biziffy, work from home opportunity, business opportunity India, side hustle online, digital partnership, earn from home, income from referrals, self-employment platform"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Earn With Us | Business Partnership & Earning Opportunities - Biziffy" />
        <meta
          property="og:description"
          content="Join Biziffy’s partner network to earn by listing businesses, referring clients, or becoming a digital associate. Start today!"
        />
        <meta property="og:url" content="https://biziffy.com/earn-with-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Earn With Us | Partner & Earn Digitally with Biziffy" />
        <meta
          name="twitter:description"
          content="Explore Biziffy’s earning opportunities — from referrals to business promotion. Work flexibly and earn smart."
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
              <h1>Unlock New Earning Opportunities with Us 🚀</h1>
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
                  <li style={{ color: "var(--blue)" }}>Earn With Us</li>
                </ol>
              </nav>
              <Link
                href="/Pages/login"
                className="text-center text-decoration-none"
              >
                <button className="login-btn text-dark fw-bold">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="my-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="earn-with-us-section-heading">
                <h1 className="earn-with-us-section-title">
                  Who Can Earn with Bizi
                  <span style={{ color: "var(--blue)" }}>ff</span>y.
                </h1>
              </div>

              <div className="row pt-4">
                {Earnperson.map((person, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
                    <div className="who-can-earn-data text-center">
                      <Image
                        src={person.image}
                        alt="Earn With Us"
                        className="earn-img"
                      />
                      <h4 className="earn-name">{person.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="earn-with-us-section-heading">
                <h1 className="earn-with-us-section-title">
                  Revenue Share with Partner
                </h1>
                <p className="earn-with-us-section-subtitle text-dark ">
                  As a partner&ldquo; you can earn through the following
                  channels:
                </p>
              </div>
              <ul className="earn-revenue-list">
                <li>
                  20% Revenue Share on the sale of all Premium Business
                  Listings.{" "}
                  <Link
                    href="/Pages/free-listing#Paidlisting"
                    className="text-decoration-none"
                  >
                    <span className="text-primary">View Plane</span>
                  </Link>
                </li>
                <li> 20% Revenue Share on all renewals.</li>
                <li>Rs. 40 per genuine and verified free business listing.</li>
                <li> Rs. 40 premium website listing.</li>
                <li>
                  Rs. 50 Corporate business listing (minimum 50 locations
                  required).
                </li>
                <li> Rs. 50 for website listing in business listing.</li>
                <li>
                  Up to Rs. 1&ldquo;00&ldquo;000&ldquo;00 Corporate
                  advertisement on Biziffy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="earn-with-us-section-heading">
                <h1 className="earn-with-us-section-title">
                  Payment Terms <span className="text-primary">&</span>{" "}
                  Conditions{" "}
                </h1>
              </div>
              <ul className="payment-info-list">
                <li>
                  <span>Payment Cycle:</span> Monthly from the 1st to the last
                  day of each month.
                </li>
                <li>
                  <span>Minimum Payout:</span> Payments are released only if
                  total earnings reach at least Rs. 15&ldquo;000.
                </li>
                <li>
                  <span>Carry Forward Policy: </span> If earnings do not reach
                  Rs. 15&ldquo;000 in a cycle&ldquo; they will be carried
                  forward to the next cycle.
                </li>
                <li>
                  <span>Payment Release Date:</span> Payments will be processed
                  by the 30th of every month.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="earn-with-us-section-heading">
                <h1 className="earn-with-us-section-title">
                  General Terms <span className="text-primary">&</span>{" "}
                  Conditions{" "}
                </h1>
              </div>
              <div className="sales-partner-list">
                <div className="sales-partner-item">
                  <span className="step-number">1.</span>
                  <p>
                    To become a Sales Partner&ldquo; you must first create a{" "}
                    <strong>Premium Business Listing</strong> for your own
                    business. Once done&ldquo; click{" "}
                    <strong>&quot;Apply Now&quot;</strong> to submit your
                    application.
                  </p>
                </div>

                <div className="sales-partner-item-bg sales-partner-item">
                  <span className="step-number">2.</span>
                  <p>
                    Selection as a Sales Partner is{" "}
                    <strong>not guaranteed</strong>. Only applicants with a
                    credible and established business&ldquo; along with a strong
                    market reputation&ldquo; will be considered.
                  </p>
                </div>

                <div className="sales-partner-item">
                  <span className="step-number">3.</span>
                  <p>
                    If selected&ldquo; you must{" "}
                    <strong>renew your own business listing annually</strong> to
                    maintain your Sales Partner status. Failure to renew will
                    result in automatic termination of your partnership&ldquo;
                    and you will no longer earn from client renewals.
                  </p>
                </div>

                <div className="sales-partner-item-bg sales-partner-item">
                  <span className="step-number">4.</span>
                  <p>
                    As a Sales Partner&ldquo; you are responsible for ensuring
                    that all business listings you create comply with{" "}
                    <strong>legal and ethical guidelines</strong>. No
                    duplicate&ldquo; copyrighted&ldquo; illegal&ldquo; or
                    infringing content is allowed.
                  </p>
                </div>

                <div className="sales-partner-item">
                  <span className="step-number">5.</span>
                  <p>
                    Any engagement in{" "}
                    <strong>illegal or unethical activities</strong> will result
                    in immediate termination of your association with us without
                    notice.
                  </p>
                </div>

                <div className=" sales-partner-item-bg sales-partner-item">
                  <span className="step-number">6.</span>
                  <p>
                    These terms are governed by our{" "}
                    <strong>Terms of Service & Infringement Policy</strong>. You
                    are strongly advised to review them before applying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
