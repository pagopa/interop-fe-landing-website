/**
 * Calculate the simple moving average
 * @param {Array} items - The list of number.
 * @param {number} window - The number of window to calculate.
 * @return {Array} The list of average value.
 */
export function simpleMovingAverage(items: Array<number>, window: number): Array<number | null> {
  let index = window - 1
  const length = items.length + 1
  const results: Array<number | null> = new Array(window).fill(null)

  while (index < length) {
    index = index + 1
    const intervalSlice = items.slice(index - window, index)
    const sum = intervalSlice.reduce((prev, curr) => prev + curr, 0)
    results.push(sum / window)
  }

  return results
}
