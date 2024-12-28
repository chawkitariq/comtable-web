import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(seconds: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= seconds;
}
