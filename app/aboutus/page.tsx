import { AboutUs } from "@/components/aboutus";
import Craftsmanship from "@/components/aboutus-page/craftsmanship";
import HowWeWork from "@/components/aboutus-page/howWeWork";
import Philosophy from "@/components/aboutus-page/philosophy";
import VisionMission from "@/components/aboutus-page/vision-mission";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";

const aboutParagraph =
  "Ultracraft is a multidisciplinary interior and furniture studio dedicated to designing spaces that feel refined, comfortable, and deeply personal. Our work blends thoughtful design, craftsmanship, and careful attention to detail to create environments that elevate everyday living. We believe interiors should not only look beautiful, but feel meaningful to the people who use them.";

const page = () => {
  return (
    <>
      <ParallaxHero
        imageUrl="/aboutus-page/abtusbackground.webp"
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

      <AboutUs
        title="The Ultracraft Journey"
        description={`At Ultracraft, we believe the spaces around us whether at home or work profoundly influence our peace, productivity, and happiness. That's why we specialize in bespoke, custom-made interior solutions, featuring high-quality furniture crafted to perfection.\n\nOur artisans pour their expertise and passion into every piece, transforming premium material into functional works of art. From intricate joinery to flawless finishes, every grain, curve, and edge reflects our commitment to superior craftsmanship and attention to detail.\n\nWe ensure that each creation is not only visually stunning but also durable and practical, designed to seamlessly enhance your daily life. 'Beyond design and crafts'.`}
        showButtons={false}
        layout="single"
        singleImageSrc="/aboutus-page/abtuspage.webp"
      />

      <VisionMission />
      <Philosophy />
      <Craftsmanship />
      <HowWeWork />
      <ContactUs />
    </>
  );
};

export default page;
