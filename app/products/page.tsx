import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParallaxHero from "@/components/hero_section";

import ProductsGrid from "@/components/products-page/products-grid";

const page = () => {
  return (
    <>
    <ParallaxHero
            imageUrl="/products-page/productshero.png"
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
      <ProductsGrid/>
    </>
  );
};

export default page;
