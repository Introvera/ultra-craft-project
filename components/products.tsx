"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  badge?: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Boucle Dining Armchair",
    price: "LKR 10,000",
    description:
      "A boucle upholstered accent chair with natural wooden legs and a modern silhouette.",
    image: "/products/ch1.png",
  },
  {
    id: 2,
    name: "Boucle Dining Armchair",
    price: "LKR 8,500",
    description:
      "Soft boucle upholstery and slim oak legs for a refined, cozy dining look.",
    badge: "25% Off",
    image: "/products/ch2.png",
  },
  {
    id: 3,
    name: "Oak Lounge Chair",
    price: "LKR 12,900",
    description:
      "Gently curved frame with generous cushioning, perfect for reading corners.",
    image: "/products/ch1.png",
  },
  {
    id: 4,
    name: "Minimalist Armchair",
    price: "LKR 9,700",
    description:
      "Clean lines and soft padding for modern living rooms and studios.",
    image: "/products/ch2.png",
  },
  {
    id: 5,
    name: "Scandi Wood Chair",
    price: "LKR 11,200",
    description:
      "Scandinavian-inspired design with warm wood tones and textured fabric.",
    image: "/products/ch1.png",
  },
];

export function Products() {
  const [activeIndex, setActiveIndex] = useState(0);

  const bigIndex = activeIndex;
  const smallIndex = (activeIndex + 1) % products.length;

  const bigCard = products[bigIndex];
  const smallCard = products[smallIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  // scroll / appear animation
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden sm:py-36 pb-36 px-4 sm:px-6 md:px-10"
    >
      <div
        className={`mx-auto w-full max-w-7xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* MOBILE: heading + text + buttons */}
        <div className="pb-40 md:hidden">
          <h1 className="mb-3 text-3xl font-semibold text-[var(--color-topic)]">
            Refined Modern Furniture
          </h1>
          <p className="text-base leading-relaxed text-black text-justify max-w-xl">
            From living spaces to workspaces, discover furniture crafted with
            intention, refined craftsmanship, and a focus on comfort,
            durability, and timeless design.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary" size="pill">
              Request Consultation
              <ArrowUpRight className="ml-2 size-5" />
            </Button>

            <Button variant="coffee" size="pill">
              Explore Products
              <ArrowUpRight className="ml-2 size-5" />
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-12 md:flex-row md:items-start md:gap-16">
          {/* LEFT: big card */}
          <div
            className={`
              w-full md:basis-[55%]
              transition-all duration-700
              ${inView ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-6"}
            `}
          >
            <div className="relative w-full h-full rounded-[40px] bg-[#E9EDF2] shadow-[0_28px_80px_rgba(0,0,0,0.18)] px-8 sm:px-12 pt-10 pb-8 overflow-visible">
              {/* chair image */}
              <div className="absolute left-5 sm:left-[40] -top-24 sm:-top-28">
                <Image
                  src={bigCard.image}
                  alt={bigCard.name}
                  width={800}
                  height={800}
                  className="w-[220px] sm:w-[350px] h-auto object-contain"
                />
              </div>

              {/* price + badge */}
              <div className="absolute top-6 right-8 sm:right-12 text-right">
                <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {bigCard.price}
                </p>
                {bigCard.badge && (
                  <p className="mt-0 text-md font-semibold text-(--color-topic)">
                    {bigCard.badge}
                  </p>
                )}
              </div>

              {/* bottom content */}
              <div className="flex h-full flex-col justify-end pt-40 sm:pt-75 pb-4">
                <div className="flex items-end justify-between gap-6">
                  <div className="w-full">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                      {bigCard.name}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-relaxed">
                      {bigCard.description}
                    </p>
                  </div>

                  
                  <ArrowUpRight className="size-2 w-8 h-8 bg-black text-white items-center justify-center rounded-full over:bg-neutral-900 transition cursor-pointer" />
                </div>
              </div>
            </div>

            {/* arrows */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition cursor-pointer"
                >
                <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition cursor-pointer"
                >
                <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* RIGHT: heading + text + buttons + small card */}
          <div
            className={`
              w-full md:basis-[45%] flex flex-col gap-8 md:mt-[-100px]
              transition-all duration-700 delay-150
              ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
            `}
          >
            {/* Desktop heading */}
            <div className="pb-24 hidden md:block">
              <h1 className="mb-3 text-3xl md:text-4xl font-semibold text-[var(--color-topic)]">
                Refined Modern Furniture
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-black text-justify md:text-left max-w-xl">
                From living spaces to workspaces, discover furniture crafted
                with intention, refined craftsmanship, and a focus on comfort,
                durability, and timeless design.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  className="
                    inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                    text-black shadow-sm
                    bg-linear-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]
                  "
                >
                  Request Consultation
                  <ArrowUpRight className="ml-2 size-5" />
                </button>

                <button
                  className="
                    inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                    text-white shadow-sm
                    bg-linear-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]
                  "
                >
                  Explore Products
                  <ArrowUpRight className="ml-2 size-5" />
                </button>
              </div>
            </div>

            {/* small card */}
            <div
              className={`
                relative mt-8
                transition-all duration-700 delay-300
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              <div className="relative w-full max-w-md h-full rounded-[40px] bg-(--color-card-background) shadow-[0_24px_70px_rgba(0,0,0,0.18)] px-8 pt-10 pb-8 overflow-visible">
                <div className="absolute left-5 sm:left-10 -top-20 sm:-top-24">
                  <Image
                    src={smallCard.image}
                    alt={smallCard.name}
                    width={600}
                    height={600}
                    className="w-[220px] sm:w-[250px] h-auto object-contain"
                  />
                </div>

                <div className="absolute top-6 right-8 sm:right-12 text-right">
                  <p className="text-lg font-semibold tracking-tight">
                    {smallCard.price}
                  </p>
                  {smallCard.badge && (
                    <p className="mt-0 text-md font-semibold text-(--color-topic)">
                      {smallCard.badge}
                    </p>
                  )}
                </div>

                <div className="flex h-full flex-col justify-end pt-45 pb-4">
                  <div className="flex items-end justify-between gap-6">
                    <div className="w-full">
                      <h3 className="text-base font-semibold tracking-tight">
                        {smallCard.name}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        {smallCard.description}
                      </p>
                    </div>

                     <ArrowUpRight className="size-2 w-8 h-8 bg-black text-white items-center justify-center rounded-full over:bg-neutral-900 transition cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}