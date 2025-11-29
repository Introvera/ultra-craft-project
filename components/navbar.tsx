// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import { Button } from "./ui/button";

// // Reusable NavLink Component
// const NavLink = ({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const isActive =
//     pathname === href || (href !== "/" && pathname.startsWith(href));

//   return (
//     <a
//       href={href}
//       className={`px-2 py-1 rounded-full transition-all font-semibold relative
//         ${
//           isActive
//             ? "bg-[#cdb495] text-slate-900 shadow-sm"
//             : "hover:bg-[#cdb49559] text-inherit"
//         }`}
//     >
//       <span className="inline-block transition-transform duration-300 hover:scale-105">
//         {children}
//       </span>

//       {/* Optional: subtle underline indicator for active (extra polish) */}
//       {isActive && (
//         <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#a67c52] rounded-full" />
//       )}
//     </a>
//   );
// };

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [usePathname()]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-[#cdb49529] backdrop-blur-md py-4 shadow-sm text-slate-900"
//           : "bg-transparent py-6 text-black"
//       }`}
//     >
//       <div className="container mx-auto px-6 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex-shrink-0">
//           <Link href="/">
//             <Image
//               src="/logo.png"
//               alt="UltraCraft Logo"
//               width={64}
//               height={64}
//             />
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className={`hidden md:flex items-center space-x-6 text-sm font-medium tracking-wide  backdrop-blur-md px-4 py-1 rounded-full border  ${isScrolled
//           ? "bg-white/10 border-white/20"
//           : "bg-none border-none"
//       }`}>
//           <NavLink href="/">Home</NavLink>
//           <NavLink href="/about">About Us</NavLink>
//           <NavLink href="/products">Products</NavLink>
//           <NavLink href="/projects">Projects</NavLink>
//         </div>

//         {/* CTA Button + Mobile Toggle */}
//         <div className="flex items-center space-x-6">
//           <Button variant="coffee" size="pill" className="hidden sm:flex">
//             Explore Products
//             <ArrowUpRight className="ml-2 size-5" />
//           </Button>

//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="absolute top-full left-0 w-full bg-white text-slate-900 shadow-2xl border-t border-slate-200 md:hidden animate-in slide-in-from-top-2">
//           <div className="container mx-auto px-6 py-8 flex flex-col space-y-6 text-lg font-medium">
//             <NavLink href="/">Home</NavLink>
//             <NavLink href="/about">About Us</NavLink>
//             <NavLink href="/products">Products</NavLink>
//             <NavLink href="/projects">Projects</NavLink>

//             <div className="pt-4 border-t border-slate-200">
//               <Button variant="coffee" size="lg" className="w-full">
//                 Explore Products
//                 <ArrowUpRight className="ml-2 size-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      className={`px-2 py-1 rounded-full transition-all font-semibold relative
        ${
          isActive
            ? "bg-[#cdb495] text-slate-900 shadow-sm"
            : "hover:bg-[#cdb49559] text-inherit"
        }`}
    >
      <span className="inline-block transition-transform duration-300 hover:scale-105">
        {children}
      </span>

      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#a67c52] rounded-full" />
      )}
    </a>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-[76px] transition-all duration-500 ${
        isScrolled
          ? "bg-[#cdb49529] backdrop-blur-md shadow-sm text-slate-900"
          : "bg-transparent text-black"
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="UltraCraft Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation (only from lg upward) */}
        <div
          className={`hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide backdrop-blur-md px-4 py-1 rounded-full border
          ${
            isScrolled ? "" : "bg-transparent border-transparent"
          } absolute left-1/2 -translate-x-1/2`}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/aboutus">About Us</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/projects">Projects</NavLink>
        </div>

        {/* CTA + Hamburger (Mobile & Tablet = only hamburger) */}
        <div className="flex items-center space-x-6">
          {/* CTA visible only on desktop (lg+) */}
          <Button variant="coffee" size="pill" className="hidden lg:flex">
            Explore Products
            <ArrowUpRight className="ml-2 size-5" />
          </Button>

          {/* Hamburger visible on mobile + tablet */}
          <button
            className="lg:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-slate-900 shadow-2xl border-t border-slate-200 lg:hidden animate-in slide-in-from-top-2">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6 text-lg font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/aboutus">About Us</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/projects">Projects</NavLink>

            <div className="pt-4 border-t border-slate-200">
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
        </div>
      )}
    </nav>
  );
}
