"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

// Reusable NavLink Component
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <a
      href={href}
      className={`
        group px-3 py-1 font-semibold relative transition-all
        ${isActive ? "text-slate-900" : "text-inherit"}
      `}
    >
      <span className="inline-block transition-transform duration-300 group-hover:scale-105">
        {children}
      </span>

      {/* Animated indicator */}
      <span
        className={`
          absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#a67c52] rounded-full
          transition-all duration-300 origin-center
          ${
            isActive
              ? "w-10 scale-x-100 opacity-100"
              : "w-10 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
          }
        `}
      />
    </a>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 py-2 text-slate-900"
          : "bg-transparent lg:py-2 md:py-2 py-4 text-slate-900"
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="UltraCraft Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex ml-28 sm:ml-12 items-center space-x-8 text-sm font-medium tracking-wide">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/projects">Projects</NavLink>
        </div>

        <div className="flex items-center space-x-6">
          <Button variant="coffee" size="pill" className="hidden sm:flex">
            Explore Products
            <ArrowUpRight className="ml-2 size-5" />
          </Button>

          <button
            className={`md:hidden ${isScrolled ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-slate-900 shadow-2xl border-t border-slate-200 md:hidden animate-in slide-in-from-top-2">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6 text-lg font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/projects">Projects</NavLink>

            <div className="pt-4 border-t border-slate-200">
              <Button variant="coffee" size="lg" className="w-full">
                Explore Products
                <ArrowUpRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
