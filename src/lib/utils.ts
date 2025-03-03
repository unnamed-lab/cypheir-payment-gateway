import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  // Check if the currency is a cryptocurrency (e.g., USDC, BTC, ETH)
  const isCrypto = ["USDC", "BTC", "ETH"].includes(currency.toUpperCase());

  if (isCrypto) {
    // For cryptocurrencies, format the amount with the currency symbol
    return `${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency.toUpperCase()}`;
  } else {
    // For traditional currencies, use Intl.NumberFormat
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
}

export function formatNumber(num: number): string {
  const absNum = Math.abs(num);
  if (absNum >= 1e9) {
    return `${(num / 1e9).toFixed(1)}Bn${num % 1e9 !== 0 ? "+" : ""}`;
  } else if (absNum >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M${num % 1e6 !== 0 ? "+" : ""}`;
  } else if (absNum >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K${num % 1e3 !== 0 ? "+" : ""}`;
  } else {
    return num.toString();
  }
}