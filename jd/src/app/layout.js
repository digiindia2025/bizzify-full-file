import "./globals.css";
import Script from "next/script";
import Footer from "./Components/Footer/Footer";
import Enquiryform from "./Components/Enquiryform/Enquiryform";
import NavWrapper from "./Components/NavWrapper/NavWrapper";
import "./Components/Heading/heading.css";

export const metadata = {
  title: "Biziffy - Business Listing & Lead Generation",
  description:
    "List your business and generate high-quality leads with Biziffy. Discover local businesses, promote services, and grow digitally.",
  keywords: [
    "Biziffy",
    "business listing",
    "lead generation",
    "local SEO",
    "digital marketing",
    "list my business",
    "grow online",
  ],
  openGraph: {
    title: "Biziffy - Find & List Local Businesses",
    description:
      "Biziffy helps you grow your business by listing it online and generating leads.",
    url: "https://biziffy.com",
    siteName: "Biziffy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biziffy - List Your Business & Get Leads",
    description: "Promote your business with Biziffy and reach more customers.",
    creator: "@biziffy",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>

      <body>
        <NavWrapper />

        <div className="childrens">
          {/* <Enquiryform /> */}
          {children}
        </div>

        <Footer />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
