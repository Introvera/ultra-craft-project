"use client";
import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import { Products } from '@/components/products'
import Services from "@/components/services-component/services";
import Uniqueness from "@/components/what-makes-us-different";
import ParallaxHero from '@/components/hero_section'
import { useEffect } from "react";
import ScrollToTopButton from "@/components/ui/scrollToTopButton";

const Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ParallaxHero />
      <AboutUs />
      <Uniqueness />
      <Products />
      <Services />
      <ContactUs />
      <ScrollToTopButton />
    </>
  );
};

export default Page;
