"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Product = {
  id: number
  name: string
  price: string
  description: string
  badge?: string
  image: string
}

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
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 1 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 1 ? -40 : 40,
    opacity: 0,
  }),
}

export function Products() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const bigIndex = activeIndex
  const smallIndex = (activeIndex + 1) % products.length

  const bigCard = products[bigIndex]
  const smallCard = products[smallIndex]

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % products.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  // scroll / appear animation
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-20 md:py-32 lg:py-36 px-4 sm:px-6 md:px-8 lg:px-10 mt-24"
    >
      <div
        className={`mx-auto w-full max-w-7xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* MOBILE: heading + text + buttons (< md) */}
        <div className="pb-12 sm:pb-20 md:hidden">
          <h1 className="mb-3 text-2xl sm:text-3xl font-semibold text-[var(--color-topic)]">
            Refined Modern Furniture
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-black text-justify max-w-xl">
            From living spaces to workspaces, discover furniture crafted with
            intention, refined craftsmanship, and a focus on comfort,
            durability, and timeless design.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
            <Button variant="primary" size="pill">
              Request Consultation
              <ArrowUpRight className="ml-2 size-4 sm:size-5" />
            </Button>

            <Button variant="coffee" size="pill">
              Explore Products
              <ArrowUpRight className="ml-2 size-4 sm:size-5" />
            </Button>
          </div>
        </div>

        {/* TABLET ONLY: heading above cards (md, but not lg) */}
        <div className="hidden md:block lg:hidden pb-10 md:pb-12">
          <h1 className="mb-3 text-3xl font-semibold text-[var(--color-topic)]">
            Refined Modern Furniture
          </h1>
          <p className="text-base leading-relaxed text-black text-left max-w-xl">
            From living spaces to workspaces, discover furniture crafted with
            intention, refined craftsmanship, and a focus on comfort,
            durability, and timeless design.
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
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

        <div className="flex w-full flex-col gap-8 sm:gap-12 md:gap-16 lg:flex-row lg:items-start">
          {/* LEFT: big card */}
          <div
            className={`
              w-full lg:basis-[55%]
              mt-10 sm:mt-8 md:mt-12 lg:mt-0
              transition-all duration-700
              ${inView ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-6"}
            `}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={bigCard.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-[#E9EDF2] shadow-[0_28px_80px_rgba(0,0,0,0.18)] px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-15 sm:mt-10 pb-4 sm:pb-6 lg:pb-8 overflow-visible"
              >
                {/* chair image */}
                <div className="absolute left-2 sm:left-4 md:left-6 -top-16 sm:-top-20 md:-top-24 lg:-top-28">
                  <Image
                    src={bigCard.image || "/placeholder.svg"}
                    alt={bigCard.name}
                    width={800}
                    height={800}
                    className="w-[150px] sm:w-[200px] md:w-[280px] lg:w-[350px] h-auto object-contain"
                  />
                </div>

                {/* price + badge */}
                <div className="absolute top-3 sm:top-4 md:top-6 right-4 sm:right-6 md:right-8 lg:right-12 text-right">
                  <p className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                    {bigCard.price}
                  </p>
                  {bigCard.badge && (
                    <p className="mt-0 text-xs sm:text-sm md:text-base font-semibold text-[var(--color-topic)]">
                      {bigCard.badge}
                    </p>
                  )}
                </div>

                {/* bottom content */}
                <div className="flex h-full flex-col justify-end pt-24 sm:pt-32 md:pt-48 lg:pt-75 pb-2 sm:pb-4">
                  <div className="flex items-end justify-between gap-4 sm:gap-6">
                    <div className="w-full min-w-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-tight truncate sm:text-clip">
                        {bigCard.name}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-neutral-700 leading-relaxed line-clamp-2">
                        {bigCard.description}
                      </p>
                    </div>

                    <button className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black text-white rounded-full hover:bg-neutral-900 transition cursor-pointer">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* arrows */}
            {/* <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-4">
              <button
                onClick={handlePrev}
                className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition cursor-pointer flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleNext}
                className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition cursor-pointer flex-shrink-0"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div> */}
            <div className="mt-4 flex items-center justify-center md:justify-between">
              {/* ARROWS (desktop/tablet only) */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 bg-white hover:bg-neutral-900 hover:text-white transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* DOTS (mobile only) */}
              <div className="mt-2 flex md:hidden items-center gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index === activeIndex) return
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${index === activeIndex
                        ? "w-4 bg-[var(--uc-dot-active-bg)]"
                        : "w-2 bg-black opacity-20 hover:opacity-60"}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: heading + text + buttons + small card */}
          <div
            className={`
              w-full lg:basis-[45%] flex flex-col gap-6 sm:gap-8 lg:mt-[-100px]
              transition-all duration-700 delay-150
              ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
            `}
          >
            {/* Desktop heading (lg and up) */}
            <div className="pb-8 md:pb-16 lg:pb-24 hidden lg:block">
              <h1 className="mb-2 sm:mb-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--color-topic)]">
                Refined Modern Furniture
              </h1>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-black text-left max-w-xl">
                From living spaces to workspaces, discover furniture crafted
                with intention, refined craftsmanship, and a focus on comfort,
                durability, and timeless design.
              </p>

              <div className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4">
                <button
                  className="
                    inline-flex items-center rounded-full px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium cursor-pointer
                    text-black shadow-sm
                    bg-linear-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]
                  "
                >
                  Request Consultation
                  <ArrowUpRight className="ml-2 size-4 md:size-5" />
                </button>

                <button
                  className="
                    inline-flex items-center rounded-full px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium cursor-pointer
                    text-white shadow-sm
                    bg-linear-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]
                  "
                >
                  Explore Products
                  <ArrowUpRight className="ml-2 size-4 md:size-5" />
                </button>
              </div>
            </div>

            {/* small card */}
            <div className="hidden sm:block relative pt-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={smallCard.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="transition-all duration-700 delay-300 relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-[var(--color-card-background)] shadow-[0_24px_70px_rgba(0,0,0,0.18)] px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 mt-10 pb-4 sm:pb-6 lg:pb-8 overflow-visible"
                >
                  <div className="absolute left-2 sm:left-4 md:left-6 lg:left-10 -top-10 sm:-top-14 md:-top-22 lg:-top-24">
                    <Image
                      src={smallCard.image || "/placeholder.svg"}
                      alt={smallCard.name}
                      width={600}
                      height={600}
                      className="w-[110px] sm:w-[140px] md:w-[180px] lg:w-[250px] h-auto object-contain"
                    />
                  </div>

                  <div className="absolute top-3 sm:top-4 md:top-6 right-4 sm:right-6 md:right-8 lg:right-12 text-right pt-4">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tight">
                      {smallCard.price}
                    </p>
                    {smallCard.badge && (
                      <p className="mt-0 text-xs sm:text-sm md:text-base font-semibold text-[var(--color-topic)]">
                        {smallCard.badge}
                      </p>
                    )}
                  </div>

                  <div className="flex h-full flex-col justify-end pt-16 sm:pt-20 md:pt-28 lg:pt-45 pb-2 sm:pb-4">
                    <div className="flex items-end justify-between gap-4 sm:gap-6">
                      <div className="w-full min-w-0">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold tracking-tight truncate sm:text-clip">
                          {smallCard.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm lg:text-base text-neutral-700 leading-relaxed line-clamp-2">
                          {smallCard.description}
                        </p>
                      </div>

                      <button className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black text-white rounded-full hover:bg-neutral-900 transition cursor-pointer">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}