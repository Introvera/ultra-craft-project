"use client";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "./ui/button";
import BlurText from "./ui/blurText";
import { motion } from "framer-motion";

export default function ParallaxHero() {
  const scrollY = useScrollPosition();
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div className="p-0 md:pt-14 lg:pb-2 lg:pt-14 md:p-2 lg:p-2 h-screen">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:rounded-2xl sm:border rounded-none border-none ">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 items-center"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage:
              // "linear-gradient(to right,rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url('/home/hero.png')",
              "linear-gradient(to right,rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url('/home/hero_background.jpg')",

            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />

        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Content Layer */}
        <div className="relative min-h-screen flex flex-col justify-center">
          <div
            className="relative z-20 text-white max-w-max px-6 md:px-12 lg:px-20"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <BlurText
              text="Est. 2024"
              delay={10}
              animateBy="letters"
              direction="top"
              className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 opacity-90"
            />

            <BlurText
              text="Legacy of"
              delay={10}
              animateBy="words"
              direction="top"
              className="text-5xl md:text-7xl lg:text-8xl font-inter font-bold leading-tight tracking-tight"
            />

            <BlurText
              text="Infinite Living."
              delay={100}
              animateBy="words"
              direction="top"
              className="text-5xl md:text-7xl lg:text-8xl font-inter font-bold leading-tight tracking-tight"
            />

            <BlurText
              text="Experience unparalleled craftsmanship and timeless design with Ultra Craft, where every creation tells a story of legacy and infinite living."
              delay={150}
              animateBy="words"
              direction="top"
              className="mt-6 max-w-lg text-sm md:text-base leading-relaxed opacity-90"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                variant="hero"
                size="pill"
                className="mt-8 transform-fill"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2"
                >
                  Explore Collection
                  <ArrowUpRight className="size-5" />
                </motion.a>
              </Button>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
