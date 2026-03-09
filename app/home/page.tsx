import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";
import { Products } from "@/components/products";
import Projects from "@/components/projects";
import Services from "@/components/services-component/services";
import Uniqueness from "@/components/what-makes-us-different";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture Shop in Wellawaththa, Colombo",
  description:
    "Ultracraft provides premium furniture and interior solutions in Wellawaththa, serving nearby locations within a 30km range.",
  keywords: [
    "furniture shop around Wellawaththa",
    "furniture shop within 30km",
    "furniture Colombo 04",
    "custom furniture Wellawaththa",
    "home furniture Sri Lanka",
  ],
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    url: "https://www.ultracraft.lk/home",
    title: "Ultracraft Furniture Shop | Wellawaththa",
    description:
      "Looking for a furniture shop around 30km from Wellawaththa? Explore Ultracraft's custom and premium furniture collections.",
    images: ["/footer/UltracraftBrandLogo.webp"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Ultracraft",
  url: "https://www.ultracraft.lk/home",
  image: "https://www.ultracraft.lk/footer/UltracraftBrandLogo.webp",
  description:
    "Premium furniture and interior solutions for homes, offices, and apartments in and around Wellawaththa.",
  telephone: "+94 11 255 6333",
  email: "hello@ultracraft.lk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "19A, Visaka Road",
    addressLocality: "Wellawaththa",
    addressRegion: "Colombo",
    postalCode: "00400",
    addressCountry: "LK",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Wellawaththa",
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 6.8762,
        longitude: 79.8622,
      },
      geoRadius: 30000,
    },
  ],
  sameAs: [
    "https://www.facebook.com/ultracraftfurniturelk",
    "https://www.linkedin.com/company/ultracraft-pvt-ltd/",
    "https://www.instagram.com/ultracraft.lk/",
  ],
};

const page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
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
