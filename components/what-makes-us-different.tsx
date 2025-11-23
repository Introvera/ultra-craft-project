"use client";
import Image from "next/image";

const mdify = (pos: string) =>
  pos
    .split(/\s+/)
    .map((t) => `md:${t}`)
    .join(" ");

type Service = {
  title: string;
  description: string;
  image: string;
  imageMobile: string;
  mdSpan: string;
  posMd: string;
  mColSpan: "col-span-1" | "col-span-2";
  mHeight: string;
  posMobile?: string;
  align?: "center" | "right" | "left";
};

const services: Service[] = [
  {
    title: "Complete Service Coverage",
    description:
      "We manage everything from concept and design to furniture production and project execution, so every stage feels effortless.",
    image: "/backgrounds/service.png",
    imageMobile: "/backgrounds/servicemobile.jpg",
    mdSpan: "md:col-span-2 md:row-span-2",
    posMd: "top-10 ",
    mColSpan: "col-span-2",
    mHeight: "h-72",
    posMobile: "top-6",
  },
  {
    title: "Designed for Real Living",
    description:
      "We shape interiors that enhance daily comfort, rhythm, and lifestyle.",
    image: "/backgrounds/designed.jpg",
    imageMobile: "/backgrounds/designedmobile.png",
    mdSpan: "md:col-span-4",
    posMd: "top-10 left-6",
    mColSpan: "col-span-2",
    mHeight: "h-56",
    posMobile: "top-6 left-4",
  },
  {
    title: "Trusted by Leading Clients",
    description:
      "Crafted with precision and durable materials to ensure timeless beauty and lasting performance.",
    image: "/backgrounds/trusted.jpg",
    imageMobile: "/backgrounds/trustedmobile.png",
    mdSpan: "md:col-span-2",
    posMd: "bottom-6 left-6",
    mColSpan: "col-span-1",
    mHeight: "h-44",
    posMobile: "bottom-20 left-4",
    align: "center",
  },
  {
    title: "Lasting Quality",
    description:
      "Crafted with precision and durable materials to ensure timeless beauty and lasting performance.",
    image: "/backgrounds/lasting.jpg",
    imageMobile: "/backgrounds/lastingmobile.png",
    mdSpan: "md:col-span-2",
    posMd: "bottom-26 left-6",
    mColSpan: "col-span-1",
    mHeight: "h-44",
    posMobile: "bottom-27 left-4",
    align: "center",
  },
];

export default function Uniqueness() {
  return (
    <section id="services" className="py-28 px-6 sm:px-8 md:px-10 lg:px-16 ">
      <h2
        className="text-left mb-3 font-bold"
        style={{
          fontWeight: 700,
          fontStyle: "bold",
          fontSize: "32px",
          lineHeight: "100%",
          letterSpacing: "0",
          color: "#604D37",
          opacity: 1,
        }}
      >
        What Makes Us Different
      </h2>

      <div
        className="
    grid gap-1 md:gap-2 lg:gap-3
    grid-cols-2
    md:grid-cols-6
    md:auto-rows-[190px]
    lg:auto-rows-[200px]
  "
      >
        {services.map((s, i) => (
          <article
            key={i}
            className={`
              relative overflow-hidden group rounded-4xl border border-white/5
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              ${s.mColSpan} ${s.mHeight}
              md:h-auto md:col-span-1
              ${s.mdSpan}
              px-4 sm:px-6 md:px-8
              
            `}
          >
            {/* Tablet/Desktop image */}
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i < 2}
              unoptimized
              sizes="(max-width: 767px) 0px, (max-width: 1279px) 25vw, 25vw"
              className="hidden md:block object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Mobile image */}
            <Image
              src={s.imageMobile}
              alt={`${s.title} mobile`}
              fill
              sizes="100vw"
              className="md:hidden object-cover"
            />

            {/* Text block */}
            {s.align === "center" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
                <h3 className="font-semibold leading-tight text-[#FAFAFA] tracking-wide text-base sm:text-lg md:text-[15px] lg:text-[24px]">
                  {s.title}
                </h3>
                <p className="text-[#FAFAFA] font-medium text-xs sm:text-sm md:text-[16px] lg:text-xs">
                  {s.description}
                </p>
              </div>
            ) : (
              <div
                className={`
                  absolute z-10 max-w-[88%]
                  ${s.posMobile ?? "top-4 left-4"}
                  ${mdify(s.posMd)}
                  ${s.align === "right" ? "text-right" : "text-left"}
                `}
              >
                <h3 className="font-semibold leading-tight text-[#FAFAFA] tracking-wide text-base sm:text-lg md:text-[15px] lg:text-[24px]">
                  {s.title}
                </h3>
                <p className="text-[#FAFAFA] font-medium text-xs sm:text-sm md:text-[16px] lg:text-xs">
                  {s.description}
                </p>
              </div>
            )}

            {/* Hover ring */}
            <div className="pointer-events-none hidden md:block absolute inset-0 ring-0 ring-purple-400/0 group-hover:ring-2 group-hover:ring-purple-400/30 rounded-2xl transition-all duration-300" />
          </article>
        ))}
      </div>
    </section>
  );
}
