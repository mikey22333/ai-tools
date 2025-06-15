/**
 * Format numbers consistently for both server and client rendering
 * to avoid hydration errors
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

/**
 * Format large numbers with commas using a consistent locale
 */
export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString('en-US')
}
