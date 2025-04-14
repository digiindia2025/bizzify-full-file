import React from "react";
import CityCards from "./Components/CityFilter/CityFilter";
import BussinessCategory from "./Components/BussinessCate/BussinessCategory";
import TrustPilot from "./Components/TrustPilot/TrustPilot";
import HomeCategorySlider from "./Components/HomeCategorySlider/HomeCategorySlider ";
// import ServicesCategories from "./Components/ServicesCategories/ServicesCategories";
import TestimonialSection from "./Components/Testimonial/Testimonial";

import Blogs from "./Components/Blogs/Blogs";

import Hero from "./Components/Hero/hero";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeCategorySlider />
      <BussinessCategory />
      {/* <ServicesCategories /> */}
      <CityCards />
      <TrustPilot />
      <Blogs />
      <TestimonialSection />
    </>
  );
}
