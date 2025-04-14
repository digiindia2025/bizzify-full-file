"use client";
import { useState } from "react";
import "./Testimonial.css";
import Heading from "../Heading/SecHeading";

const TestimonialSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showAll, setShowAll] = useState(false); // State for View More / View Less

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "What is Bizzify?",
      answer:
        "Bizzify is a platform that allows businesses to create and manage online profiles, including details such as contact information, business hours, and services offered. Users can search for businesses by category or location to find relevant services and products",
    },
    {
      id: 2,
      question: "How do I create a listing on Bizzify?",
      answer:
        "To create a listing, sign up with your mobile number, fill out your business details, and submit the information. You can then add photos and videos to enhance your profile.",
    },
    {
      id: 3,
      question: "Is there a cost to create a listing on Bizzify?",
      answer:
        "Bizzify offers both free and paid listing options. Free listings provide basic visibility, while paid listings offer additional features and prominent placement for a fee.",
    },
    {
      id: 4,
      question: "What are the benefits of a paid listing?",
      answer:
        "Paid listings on Bizzify receive top placement in search results, extra profile features, priority support, advanced analytics, and exclusive promotional opportunities. This helps increase visibility and attract more customers.",
    },
    {
      id: 5,
      question: "How can I upgrade to a paid listing on Bizzify?",
      answer:
        "To upgrade, visit our paid listing page and select the option that suits your needs. Follow the instructions to complete the payment process and enjoy the enhanced benefits.",
    },
    {
      id: 6,
      question:
        "Can I edit or update my listing after it’s published on Bizzify?",
      answer:
        "Yes, you can update your listing at any time. Log in to your account, make the necessary changes, and save the updates to ensure your information remains current.",
    },
    {
      id: 7,
      question: "What types of content are not allowed on Bizzify?",
      answer:
        "Bizzify does not accept content related to casinos, gambling, or adult material. All content must comply with our guidelines and be approved by our IT team before publication.",
    },
    {
      id: 8,
      question: "How long does it take for my listing to go live on Bizzify?",
      answer:
        "Free listings typically go live within a few hours, while featured or paid listings may take a bit longer due to additional review and approval processes.",
    },
    {
      id: 9,
      question: "How do I know if my listing has been approved on Bizzify?",
      answer:
        "You will receive a notification via email or through your account dashboard once your listing has been approved and is live on the site.",
    },
    {
      id: 10,
      question:
        "Can I remove my listing from Bizzify if I no longer want it to be visible?",
      answer:
        "Yes, you can deactivate or remove your listing by logging into your account and selecting the option to delete or hide the listing.",
    },
    {
      id: 11,
      question: "Who can I contact for support on Bizzify?",
      answer:
        "For any issues or questions, please contact our support team via support email or through our contact form on the website. We are here to help!",
    },
    {
      id: 12,
      question:
        "Are there any additional fees for making changes to my listing on Bizzify?",
      answer:
        "No additional fees are charged for making updates or changes to your listing. However, if you wish to upgrade to a paid listing or add extra features, applicable fees will apply.",
    },
  ];

  // Show only the first 5 FAQs initially, then all when showAll is true
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <>
      <Heading title="Frequently Asked Questions" subtitle="FAQ & Reviews" />
      <div className="testimonil-section container-fluid py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              {visibleFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="testimonil-faq-box p-3 rounded shadow-sm mb-3"
                >
                  <button
                    className="testimonil-faq-btn btn w-100 text-start fw-bold"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {faq.id}. {faq.question}{" "}
                    {openFaq === faq.id ? (
                      <i className="bi bi-caret-up-fill"></i>
                    ) : (
                      <i className="bi bi-caret-down-fill"></i>
                    )}
                  </button>

                  {openFaq === faq.id && (
                    <p className="testimonil-faq-answer mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}

              {/* View More / View Less Button */}
              <div className="d-flex justify-content-center mt-2">
                <button
                  className="login-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "View Less" : "View More"}{" "}
                  <i
                    className={`bi bi-chevron-${
                      showAll ? "compact-up" : "compact-down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;
