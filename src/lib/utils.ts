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

/**
 * Validates whether a given string is a valid UUID version 4.
 *
 * @param {string} uuid - The UUID string to validate.
 * @returns {boolean} - Returns `true` if the UUID is valid and version 4, otherwise `false`.
 */
export function isValidUuidV4(uuid: string): boolean {
  const pattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  return pattern.test(uuid);
}

export function generateDocumentNumber(referenceNumber = 0): string {
  const incrementedRef = (referenceNumber + 1).toString().padStart(6, "0");
  return `INV-${incrementedRef}`;
}
