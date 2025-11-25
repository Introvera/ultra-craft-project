"use client";
import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";
import { Products } from "@/components/products";
import Services from "@/components/services-component/services";
import TestimonialCarousel from "@/components/testimonials-component/testimonials";
import Uniqueness from "@/components/what-makes-us-different";

const page = () => {
  return (
    <>
      <ParallaxHero />
      <AboutUs />
      <Uniqueness />
      <Products />
      <Services />
      <TestimonialCarousel />
      <ContactUs />
    </>
  );
};

export default page;
