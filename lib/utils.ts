//file:lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Combined class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a human-readable string
 * @param date - Date to format
 * @param locale - Locale to use for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Truncates a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length (default: 50)
 * @returns Truncated string with ellipsis if necessary
 */
export function truncateString(str: string, length: number = 50): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

/**
 * Generates a random string of specified length
 * @param length - Length of the string to generate (default: 16)
 * @returns Random string
 */
export function generateRandomString(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)
  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomValues[i] % chars.length)
  }
  return result
}

/**
 * Safely access nested object properties
 * @param obj - Object to access
 * @param path - Path to the property (dot notation)
 * @param defaultValue - Default value if path doesn't exist
 * @returns Property value or default value
 */
export function getNestedValue<T, O extends Record<string, unknown>>(
  obj: O,
  path: string,
  defaultValue: T
): T {
  const value = path
    .split('.')
    .reduce((acc: unknown, part) => (acc as Record<string, unknown>)?.[part], obj)
  return value === undefined ? defaultValue : value as T
}

/**
 * Debounces a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}