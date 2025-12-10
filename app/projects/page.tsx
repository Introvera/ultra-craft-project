import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParallaxHero from "@/components/hero_section";
import ContactUs from "@/components/contact";
import AutoProducts from "@/components/projects-page/AutoProducts";
import ProjectsGrid from "@/components/projects-page/projects-grid";

const aboutParagraph =
"Explore the homes, apartments, and commercial interiors we’ve brought to life through thoughtful design, careful planning, and refined craftsmanship. Each project reflects our commitment to creating meaningful, functional, and beautifully balanced spaces shaped around the people who use them."

const page = () => {
  return (
    <>
      <ParallaxHero
              imageUrl="/projects-page/projectshero.png"
              heading={
                <>
                  Shaping Spaces <br /> With Purpose
                </>
              }
              description=""
              showCta={false}
              showChevron={true}
              alignTopLeft={true}
              bottomRightText={aboutParagraph}
            />
      <AutoProducts/>
      <ProjectsGrid />
      <ContactUs />
    </>
  );
};

export default page;
