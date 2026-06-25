import { AboutUs } from "@/components/aboutus";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";
import { Products } from "@/components/products";
import Projects from "@/components/projects";
import Services from "@/components/services-component/services";
import Uniqueness from "@/components/what-makes-us-different";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture Shop in Bambalapitiya, Colombo",
  description:
    "Ultracraft provides premium furniture and interior solutions in Bambalapitiya, Colombo, and nearby locations within a 40km range.",
  keywords: [
    "furniture shop in Bambalapitiya",
    "furniture shops in Bambalapitiya",
    "furniture shop in Colombo",
    "furniture shop near me",
    "furniture shop within 40km",
    "furniture Colombo 04",
    "custom furniture Bambalapitiya",
    "home furniture Sri Lanka",
    "beds",
    "wardrobe",
    "sofa",
    "dining table",
    "pantry",
  ],
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    url: "https://www.ultracraft.lk/home",
    title: "Ultracraft Furniture Shop | Bambalapitiya",
    description:
      "Looking for a furniture shop in Bambalapitiya or Colombo? Explore Ultracraft's custom and premium furniture collections.",
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
    "Premium furniture and interior solutions including beds, wardrobes, sofas, dining tables, and pantries for homes, offices, and apartments in Bambalapitiya, Colombo, and nearby areas.",
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
      name: "Bambalapitiya",
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 6.8967,
        longitude: 79.8588,
      },
      geoRadius: 40000,
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
