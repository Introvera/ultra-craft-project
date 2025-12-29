"use client";
import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";
import { Products } from "@/components/products";
import Projects from "@/components/projects";
import Services from "@/components/services-component/services";
import Uniqueness from "@/components/what-makes-us-different";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <title>Ultracraft - Premium Furniture</title>
        <meta
          name="description"
          content="Premium furniture and interior solutions for modern homes, offices, and luxury apartments."
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ultracraft",
              url: "https://www.ultracraft.lk",
              logo: "https://www.ultracraft.lk/footer/UltracraftBrandLogo.webp",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+94 11 255 6333",
                contactType: "Customer service",
                email: "hello@ultracraft.lk",
              },
              sameAs: [
                "https://www.facebook.com/ultracraftfurniturelk",
                "https://www.linkedin.com/company/ultracraft-pvt-ltd/",
                "https://www.instagram.com/ultracraft.lk/",
              ],
            }),
          }}
        />
      </Head>
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
