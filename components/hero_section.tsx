"use client";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "./ui/button";

export default function ParallaxHero() {
  const scrollY = useScrollPosition();

  return (
    <div className="relative h-screen w-full overflow-hidden flex ">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: "url('/home/hero_background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120%",
        }}
      />

      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content Layer */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Left-aligned text block */}
        <div
          className="relative z-20 text-white max-w-max px-6 md:px-12 lg:px-20"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <h2 className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 opacity-90">
            Est. 2024
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-inter font-bold leading-tight tracking-tight">
            Legacy of <br />
            <span className="font-medium">Infinite Living.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed opacity-90">
            Experience unparalleled craftsmanship and timeless design with Ultra
            Craft, where every creation tells a story of legacy and infinite
            living.
          </p>
          <Button variant={"hero"} size={"pill"} className="mt-8">
            Explore Collection
            <ArrowUpRight className="size-5" />
          </Button>
        </div>

        {/* Chevron stays centered at the bottom */}
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
