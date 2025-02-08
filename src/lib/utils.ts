import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(seconds: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= seconds;
}

/**
 * Converts all `null` values in an object and its nested objects to `undefined`.
 */
export function convertNullToUndefined<T extends object>(obj: T = {} as T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null
        ? undefined
        : value && typeof value === "object" && !Array.isArray(value)
        ? convertNullToUndefined(value)
        : value,
    ])
  ) as T;
}
