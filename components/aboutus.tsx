"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

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

  const StatsBlock = (
    <div
      className={`
        mt-12 sm:border-t sm:border-line pt-8
        transition-all duration-700
        ${
          inView
            ? "opacity-100 -translate-x-0"
            : "opacity-0 -translate-x-4"
        }
      `}
    >
      <div className="flex flex-row items-stretch justify-between">
        {stats.map((stat, idx) => {
          const animatedValue = useCountUp(
            stat.value,
            inView,
            1400 + idx * 200
          );
          const isNotFirst = idx > 0;

          return (
            <div
              key={stat.label}
              className={`
                flex flex-col items-center text-center px-2
                md:flex-row md:items-center md:text-left md:px-4
                transition-all duration-700
                ${
                  inView
                    ? "opacity-100 -translate-x-0"
                    : "opacity-0 -translate-x-4"
                }
                ${isNotFirst ? "border-l border-line pl-4 md:pl-6" : ""}
              `}
              style={{ transitionDelay: `${350 + idx * 120}ms` }}
            >
              <div className="tabular-nums text-3xl md:text-4xl font-semibold">
                {stat.prefix ?? ""}
                {animatedValue}
                {stat.suffix ?? ""}
              </div>

              <div
                className={`
                  mt-2 md:mt-0 md:ml-4
                  text-xs sm:text-sm font-semibold leading-snug
                  normal-case
                  md:uppercase md:tracking-[0.25em] md:leading-5
                `}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-12 pb-12 px-4 sm:px-6 md:px-10 my-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* LEFT: text + buttons (+ stats from md and up) */}
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

          {/* Buttons (you said these are fine) */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="pill"
              className={` bg-gradient-to-r from-[var(--gradient-3)] to-[var(--gradient-4)] text-black
                transition-all duration-700 delay-300
                ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }
              `}
            >
              Request Consultation
              <ArrowUpRight className="ml-2 size-5" />
            </Button>

            <Button
              size="pill"
              className={` bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white
                transition-all duration-700 delay-300
                ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }
              `}
            >
              Explore Products
              <ArrowUpRight className="ml-2 size-5" />
            </Button>
          </div>

          {/* Stats on tablet + desktop */}
          <div className="hidden md:block">{StatsBlock}</div>
        </div>

        {/* RIGHT: images + stats on mobile only */}
        <div className="w-full md:basis-[45%]">
          {/* MOBILE collage */}
          <div className="md:hidden">
            <div className="relative w-full h-[360px]">
              {/* Bottom-left large image */}
              <div
                className={`absolute left-6 bottom-0 h-8/9 w-4/7 overflow-hidden rounded-[40px] bg-card border-3 border-[var(--page-bg)]
                  transition-all duration-[1500ms]
                  ${
                    inView
                      ? "translate-y-2 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
              >
                <Image
                  src="/aboutus/about01.jpg"
                  alt="Cozy interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top-right large image */}
              <div
                className={`absolute right-5 top-1 h-7/15 w-5/9 overflow-hidden rounded-[40px] bg-card border-3 border-[var(--page-bg)]
                  transition-all duration-[1500ms] delay-150
                  ${
                    inView
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }
                `}
              >
                <Image
                  src="/aboutus/about03.jpg"
                  alt="Living room"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom-right small overlapping image */}
              <div
                className={`absolute right-12 bottom-4 h-3/7 w-3/8 overflow-hidden rounded-[32px] bg-card shadow-md border-3 border-[var(--page-bg)]
                  transition-all duration-[1500ms] delay-300
                  ${
                    inView
                      ? "translate-y-4 opacity-100"
                      : "translate-y-0 opacity-0"
                  }
                `}
              >
                <Image
                  src="/aboutus/about02.jpg"
                  alt="Accent chair"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Stats only on mobile here */}
            <div className="md:hidden">{StatsBlock}</div>
          </div>

          {/* TABLET + DESKTOP collage */}
          <div className="relative hidden md:block min-h-[420px] md:w-[360px] lg:w-[420px] md:mx-auto">
            <div
              className={`absolute left-[-30px] top-10 h-full w-3/4 overflow-hidden rounded-[60px] lg:rounded-[80px] md:border-4 md:border-[var(--page-bg)] bg-card transition-all duration-[1500ms] ${
                inView ? "translate-y-2 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/about01.jpg"
                alt="Main interior"
                fill
                className="object-cover"
              />
            </div>

            <div
              className={`absolute right-0 -top-6 h-1/2 w-6/9 overflow-hidden rounded-[40px] lg:rounded-[50px] md:border-4 md:border-[var(--page-bg)] transition-all duration-[1500ms] delay-150 ${
                inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/about02.jpg"
                alt="Warm living room"
                fill
                className="object-cover"
              />
            </div>

            <div
              className={`absolute right-4 bottom-6 h-1/2 w-3/6 overflow-hidden rounded-[28px] lg:rounded-[30px] md:border-4 md:border-[var(--page-bg)] bg-card shadow-md transition-all duration-[1500ms] delay-300 ${
                inView
                  ? "translate-y-6 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <Image
                src="/aboutus/about03.jpg"
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