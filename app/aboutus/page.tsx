import { AboutUs } from "@/components/aboutus";
import Craftsmanship from "@/components/aboutus-page/craftsmanship";
import Philosophy from "@/components/aboutus-page/philosophy";
import VisionMission from "@/components/aboutus-page/vision-mission";
import ContactUs from "@/components/contact";
import ParallaxHero from "@/components/hero_section";
import HowWeWork from "@/components/aboutus-page/howWeWork";

const aboutParagraph =
  "Ultracraft is a multidisciplinary interior and furniture studio dedicated to designing spaces that feel refined, comfortable, and deeply personal. Our work blends thoughtful design, craftsmanship, and careful attention to detail to create environments that elevate everyday living. We believe interiors should not only look beautiful, but feel meaningful to the people who use them.";

const page = () => {
  return (
    <>
      <ParallaxHero
        imageUrl="/aboutus-page/abtusbackground.png"
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
        title="The Journey Behind Us"
        description={`Ultracraft began with a simple belief: that interior spaces should feel as meaningful as they look. What started as a small design practice grew into a multidisciplinary studio shaped by curiosity, craftsmanship, and a deep respect for the way people live and work. Over the years, we’ve built a reputation for creating warm, refined interiors that balance beauty, function, and emotional comfort, one thoughtfully crafted project at a time. What started as a small design practice grew into a multidisciplinary studio shaped by curiosity, craftsmanship, and a deep respect for the way people live and work.`}
        showButtons={false}
        layout="single"
        singleImageSrc="/aboutus-page/abtuspage.png"
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
