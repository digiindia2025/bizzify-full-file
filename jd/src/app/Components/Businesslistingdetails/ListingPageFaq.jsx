"use client";
import { useState } from "react";
import "../Testimonial/Testimonial.css";

const ListingPageFaq = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showAll, setShowAll] = useState(false); // State for View More / View Less

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "What are the various modes of payment accepted on Bizzify?",
      answer:
        "Bizzify accepts various modes of payment, including credit/debit cards, UPI, and net banking. For specific payment methods, please refer to our payment options page.",
    },
    {
      id: 2,
      question: "How long does it take for my listing to go live on Bizzify?",
      answer:
        "Free listings typically go live within a few hours, while featured or paid listings may take a bit longer due to additional review and approval processes.",
    },

    {
      id: 3,
      question: "What types of content are not allowed on Bizzify?",
      answer:
        "Bizzify does not accept content related to casinos, gambling, or adult material. All content must comply with our guidelines and be approved by our IT team before publication.",
    },

    {
      id: 4,
      question:
        "Can I edit or update my listing after it’s published on Bizzify?",
      answer:
        "Yes, you can update your listing at any time. Log in to your account, make the necessary changes, and save the updates to ensure your information remains current.",
    },

    {
      id: 5,
      question: "How do I create a listing on Bizzify?",
      answer:
        "To create a listing, sign up with your mobile number, fill out your business details, and submit the information. You can then add photos and videos to enhance your profile.",
    },
    {
      id: 6,
      question: "Is there a cost to create a listing on Bizzify?",
      answer:
        "Bizzify offers both free and paid listing options. Free listings provide basic visibility, while paid listings offer additional features and prominent placement for a fee.",
    },
    {
      id: 7,
      question: "What are the benefits of a paid listing?",
      answer:
        "Paid listings on Bizzify receive top placement in search results, extra profile features, priority support, advanced analytics, and exclusive promotional opportunities. This helps increase visibility and attract more customers.",
    },
    {
      id: 8,
      question: "How can I upgrade to a paid listing on Bizzify?",
      answer:
        "To upgrade, visit our paid listing page and select the option that suits your needs. Follow the instructions to complete the payment process and enjoy the enhanced benefits.",
    },
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <>
      <div className="container">
        <div className="row">
          <p>
            <b>Frequently Asked Questions</b>
          </p>
          {visibleFaqs.map((faq) => (
            <div
              key={faq.id}
              className="testimonil-faq-box rounded shadow-sm mb-2"
            >
              <button
                className="testimonil-faq-btn btn w-100 text-start"
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
          <div className="d-flex justify-content-center mt-1">
            <button
              className="btn btn-link"
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
    </>
  );
};

export default ListingPageFaq;
