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
    title: "WEB & MOBILE APP DEVELOPMENT",
    description:
      "Fast, modern, and user-centric applications built for performance and scale, delivering seamless native and cross-platform experiences with clean UIs and robust backends.",
    image:
      "https://kzpotlpfxxhmtzvmvbxr.supabase.co/storage/v1/object/sign/marketingSiteImgs/OurServicesImgs/web.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTNiOGMwMi1kNDIwLTQ1ZGEtOTZjMi1mYzI5ZWZmYjQ0ZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXJrZXRpbmdTaXRlSW1ncy9PdXJTZXJ2aWNlc0ltZ3Mvd2ViLnBuZyIsImlhdCI6MTc2MTU3MzQ1MCwiZXhwIjozMTcxMjE1NzM0NTB9.VWiLt-jkjfSl9B7Hu1w9GQQ65j6HlNaBrpjri7K7u78",
    imageMobile: "/backgrounds/webmobile.png",
    mdSpan: "md:col-span-2 md:row-span-2",
    posMd: "top-10 left-6",
    mColSpan: "col-span-2",
    mHeight: "h-72",
    posMobile: "top-6 left-25",
    align: "left",
  },
  {
    title: "UI/UX DESIGN",
    description:
      "Human-centered design that turns ideas into intuitive experiences.",
    image: "/backgrounds/ui.png",
    imageMobile: "/backgrounds/uimobile.png",
    mdSpan: "md:col-span-2",
    posMd: "top-10 left-6",
    mColSpan: "col-span-2",
    mHeight: "h-56",
    posMobile: "top-6 left-4",
  },
  {
    title: "BACKEND/API DEVELOPMENT",
    description:
      "Secure, scalable APIs and systems using modern backend frameworks.",
    image: "/backgrounds/backend.png",
    imageMobile: "/backgrounds/backendmobile.png",
    mdSpan: "md:col-span-1",
    posMd: "bottom-6 left-6",
    mColSpan: "col-span-1",
    mHeight: "h-44",
    posMobile: "bottom-4 left-4",
  },
  {
    title: "CONSULTING & STRATEGY",
    description:
      "Technical expertise to turn your product vision into a growth engine.",
    image: "/backgrounds/consult.png",
    imageMobile: "/backgrounds/consultmobile.png",
    mdSpan: "md:col-span-1",
    posMd: "bottom-26 left-6",
    mColSpan: "col-span-1",
    mHeight: "h-44",
    posMobile: "bottom-8 left-4",
  },
];

export default function Uniqueness() {
  return (
    <section id="services" className="py-28 px-6 sm:px-8 md:px-10 lg:px-16 ">
      <h2
        className="text-left mb-14 font-bold"
        style={{
          width: "1328px",
          height: "48px",
          fontWeight: 700,
          fontStyle: "bold",
          fontSize: "32px",
          lineHeight: "100%",
          letterSpacing: "0",
          color: "#604D37",
          opacity: 1,
        }}
      >
        <span>WHAT WE </span>
        <span className="gradient-text-line">PROVIDE</span>
      </h2>

      <div
        className="
        grid gap-4 md:gap-5 lg:gap-6
        grid-cols-2
        md:grid-cols-4
        md:auto-rows-[190px]
        lg:auto-rows-[250px]
      "
      >
        {services.map((s, i) => (
          <article
            key={i}
            className={`
              relative overflow-hidden group rounded-2xl border border-white/5
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
                <h3
                  className="font-extrabold leading-tight tracking-wide 
               text-[22px] sm:text-[26px] md:text-[32px]"
                >
                  {s.title}
                </h3>
                <p
                  className="text-gray-200/90 
               text-[14px] sm:text-[16px] md:text-[18px] 
               max-w-[90%]"
                >
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
                <h3 className="font-extrabold leading-tight tracking-wide text-base sm:text-lg md:text-[15px] lg:text-[32px]">
                  {s.title}
                </h3>
                <p className="text-gray-200/90 text-xs sm:text-sm md:text-[13px] lg:text-xs">
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
