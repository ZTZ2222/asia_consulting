import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"
import bcrypt from "bcryptjs"
import { type ClassValue, clsx } from "clsx"
import { formatDistance } from "date-fns"
import { ru } from "date-fns/locale"
import path from "path"
import { twMerge } from "tailwind-merge"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

```
/**
 * Merges and concatenates CSS class names using twMerge and clsx
 * @param {...ClassValue[]} inputs - An array of class values to be merged
 * @returns {string} A string of merged and concatenated CSS class names
 */
```
/**
 * Combines and merges CSS class names using the clsx and twMerge utilities.
 * @param {...ClassValue[]} inputs - An array of class values to be combined and merged.
 * @returns {string} A string of merged and deduplicated CSS class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates an array representing pagination based on the current page and total number of pages.
 * @param {number} currentPage - The current active page number.
 * @param {number} totalPages - The total number of pages available.
 * @returns {(number|string)[]} An array of page numbers and/or ellipsis strings representing the pagination structure.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    /**
     * Generates an array of page numbers from 1 to totalPages
     * @param {number} totalPages - The total number of pages
     * @returns {number[]} An array containing sequential page numbers
     */
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ]
}

```
/**
 * Creates a promise that resolves after a specified delay.
 * @param {number} ms - The delay in milliseconds before the promise resolves.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
```
/**
 * Creates a promise that resolves after a specified number of milliseconds
 * @param {number} ms - The number of milliseconds to wait before resolving the promise
 * @returns {Promise<void>} A promise that resolves after the specified delay
 */
export const sleepTimeout = (ms: number) =>
  /**
   * Creates a promise that resolves after a specified number of milliseconds
   * @param {number} ms - The number of milliseconds to wait before resolving the promise
   * @returns {Promise<void>} A promise that resolves after the specified delay
   */
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Salts and hashes a given password using bcrypt.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const saltAndHashPassword = async (password: string) => {
  /**
   * Compares a plain text password with a hashed password
   * @param {string} password - The plain text password to compare
   * @param {string} hashedPassword - The hashed password to compare against
   * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise
   */
  const hashedPassword = await bcrypt.hash(password, 10)

  return hashedPassword
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
/**
 * Generates a unique filename by combining a timestamp, random string, and original file extension.
 * @param {string} originalName - The original filename including its extension.
 * @returns {string} A new unique filename in the format: timestamp-randomstring.extension
 */
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}

/**
 * Formats the time distance between a given date and the current date in Russian.
 * @param {Date} date - The date to calculate the time distance from.
 * @returns {string} A string representing the formatted time distance in Russian.
 */
export const generateFilename = (originalName: string): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  /**
   * Formats a date string to a localized Russian date format.
   * @param {string} dateString - The input date string to be formatted.
   * @returns {string} The formatted date string in Russian locale (dd.mm.yyyy).
   */
  const extension = path.extname(originalName)
  return `${timestamp}-${randomString}${extension}`
}

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()

/**
 * Formats the time distance between a given date and the current date in Russian.
 * @param {Date} date - The date to calculate the distance from.
 * @returns {string} A string representing the formatted time distance in Russian.
 */
export const formatTimeDistanceCustom = (date: Date) =>
  formatDistance(date, new Date(), { locale: ru })

/**
 * Formats a date string to a localized Russian date format.
 * @param {string} dateString - The input date string to be formatted.
 * @returns {string} The formatted date string in Russian locale (dd.mm.yyyy).
 */
export const formatStringToDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("ru-RU")
}
