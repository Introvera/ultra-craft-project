"use client";
import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import { Products } from '@/components/products'
import Services from "@/components/services-component/services";
import Uniqueness from "@/components/what-makes-us-different";

const page = () => {
  return (
    <>
      <AboutUs />
      <Uniqueness />
      <Products />
      <Services />
      <ContactUs />
    </>
  );
};

export default page;
