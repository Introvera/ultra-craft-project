"use client";
import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import { Products } from "@/components/products";
import Services from "@/components/services-component/services";
import TestimonialCarousel from "@/components/testimonials-component/testimonials";
import Uniqueness from "@/components/what-makes-us-different";
import ParallaxHero from '@/components/hero_section'
import Projects from "@/components/projects";

const page = () => {
  return (
    <>
      <ParallaxHero />
      <AboutUs />
      <Uniqueness />
      <Products />
      <Services />
      <Projects />
      {/* <TestimonialCarousel /> */}
      <ContactUs />
    </>
  );
};

export default page;
