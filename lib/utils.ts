import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes Cloudinary image URLs with on-the-fly transformations:
 * - f_auto: delivers optimal modern format (WebP/AVIF) according to browser support
 * - q_auto: automatic intelligent quality compression
 * - w_${width},c_limit: limits image width to avoid downloading oversized original photos
 */
export function getOptimizedImageUrl(
  url?: string | null,
  width: number = 800,
): string {
  if (!url || typeof url !== "string") return "";

  // If not hosted on Cloudinary or not a standard upload URL, return untouched
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  // Avoid injecting duplicate transformations if already present
  if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) {
    return url;
  }

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}
