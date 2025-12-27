import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";

import ProductsGrid from "@/components/products-page/products-grid";

const page = () => {
  return (
    <>
      <ParallaxHero
        imageUrl="/products-page/productshero.webp"
        heading={
          <>
            Shaping Spaces <br /> With Purpose
          </>
        }
        description=""
        showCta={false}
        showChevron={true}
        alignTopLeft={true}
        bottomRightText={""}
      />
      <ProductsGrid />
      <ContactUs />
    </>
  );
};

export default page;
