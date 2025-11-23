"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

const stats: Stat[] = [
  { label: "Years of Experience", value: 10, prefix: "+" },
  { label: "Delivered Solutions", value: 375, prefix: "+" },
  { label: "Satisfied Clients", value: 45, prefix: "+" },
];

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, duration]);

  return value;
}

export function AboutUs() {
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
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-12 px-4 sm:px-6 md:px-10 mb-36"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:items-start md:gap-16">
        {/* Left: text + buttons + stats */}
        <div className="w-full md:basis-[55%]">
          {/* Heading */}
          <h1
            className={`mb-4 text-3xl font-semibold text-[var(--color-topic)] md:text-4xl transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            About Us
          </h1>

          {/* Paragraph */}
          <p
            className={`max-w-xl text-base leading-relaxed text-black md:text-lg text-justify md:text-left transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Ultracraft is built on a passion for creating spaces that feel
            refined, purposeful, and deeply connected to the people who use
            them. With years of experience in residential and commercial
            interiors, our team blends thoughtful design with high-quality
            craftsmanship to deliver environments that look timeless and
            function beautifully. We take pride in our collaborative approach,
            guiding clients through every decision with clarity and care to
            ensure each project becomes a true reflection of their vision.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* BUTTON 1 — gradient-3 → gradient-4 */}
            <button
              className={`
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium
                text-black shadow-sm transition-all duration-700 delay-200
                bg-gradient-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
              `}
            >
              Request Consultation
              <span className="ml-2 text-xs">↗</span>
            </button>

            {/* BUTTON 2 — gradient-1 → gradient-2 */}
            <button
              className={`
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium
                text-white shadow-sm transition-all duration-700 delay-300
                bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
              `}
            >
              Explore Products
              <span className="ml-2 text-xs">↗</span>
            </button>
          </div>

          {/* Stats + horizontal line */}
          <div
            className={`
              mt-12 flex flex-col gap-10 border-t border-line pt-8
              md:flex-row md:items-start md:justify-between
              transition-all duration-700
              ${inView ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-4"}
            `}
          >
            {stats.map((stat, idx) => {
              const animatedValue = useCountUp(
                stat.value,
                inView,
                1400 + idx * 200
              );

              const isMiddle = idx === 1;

              return (
                <div
                  key={stat.label}
                  className={`flex items-start gap-4 transition-all duration-700 ${
                    inView
                      ? "opacity-100 -translate-x-0"
                      : "opacity-0 -translate-x-4"
                  } ${
                    isMiddle
                      ? "md:border-l-2 md:border-r-2 md:border-line md:px-4"
                      : ""
                  }`}
                  style={{ transitionDelay: `${350 + idx * 120}ms` }}
                >
                  <div className="w-[80px] tabular-nums text-3xl font-semibold md:text-4xl">
                    {stat.prefix ?? ""}
                    {animatedValue}
                    {stat.suffix ?? ""}
                  </div>

                  <div className="text-xs font-bold tracking-[0.25em] uppercase leading-5">
                    <span className="block">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: images */}
        <div className="w-full md:basis-[45%]">
          {/* MOBILE VIEW */}
          <div className="flex flex-col gap-5 md:hidden">
            <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-card">
              <Image
                src="/aboutus/aboutus03.jpg"
                alt="Interior main"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-48 w-full overflow-hidden rounded-3xl bg-card">
              <Image
                src="/aboutus/aboutus01.jpg"
                alt="Interior warm living room"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-48 w-full overflow-hidden rounded-3xl bg-card">
              <Image
                src="/aboutus/aboutus02.jpg"
                alt="Accent chair"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* DESKTOP VIEW */}
          <div className="relative hidden md:block min-h-[460px] w-[420px] ml-auto">
            {/* Main big image */}
            <div
              className={`absolute left-[-50] top-10 h-[448px] w-[320px] overflow-hidden rounded-[80px] md:border-4 md:border-[var(--page-bg)] bg-card transition-all duration-[1500ms] ${
                inView ? "translate-y-2 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/aboutus1.jpg"
                alt="Main interior"
                fill
                className="object-cover"
              />
            </div>

            {/* Top-right image */}
            <div
              className={`absolute right-0 -top-11 h-[239px] w-[314px] overflow-hidden rounded-[50px] md:border-4 md:border-[var(--page-bg)] transition-all duration-[1500ms] delay-150 ${
                inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/aboutus2.jpg"
                alt="Warm living room"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom-right image */}
            <div
              className={`absolute right-6 bottom-11 h-[223px] w-[207px] overflow-hidden rounded-[30px] md:border-4 md:border-[var(--page-bg)] bg-card shadow-md transition-all duration-[1500ms] delay-300 ${
                inView ? "translate-y-10 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/aboutus3.jpg"
                alt="Accent chair"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}