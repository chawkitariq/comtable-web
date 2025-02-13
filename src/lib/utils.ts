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

/**
 * Generates a strong random password.
 *
 * @param {number} [length=12] - The length of the password to generate (default is 12).
 * @returns {string} The generated random password.
 */
export function generateRandomPassword(length = 24) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
