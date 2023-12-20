import { formatThousands, toFormattedLongDate } from "./formatters.utils"

export function getLocalizedValue<TValue>(option: Record<'it' | 'en', TValue>): TValue {
  if (typeof window !== 'undefined') {
    const activeLang = window.document.documentElement.lang
    if (activeLang === 'en') return option.en
  }

  return option.it
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function linearScale(domain: [number, number], range: [number, number]) {
  const domainLength = domain[1] - domain[0]
  const rangeLength = range[1] - range[0]
  return function (x: number) {
    return range[0] + ((x - domain[0]) / domainLength) * rangeLength
  }
}
