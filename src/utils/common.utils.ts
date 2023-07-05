import Fuse from 'fuse.js'

export function getLocalizedValue<TValue>(option: Record<'it' | 'en', TValue>): TValue {
  if (typeof window !== 'undefined') {
    const activeLang = window.document.documentElement.lang
    if (activeLang === 'en') return option.en
  }

  return option.it
}

export function fuzzySearch<TItem>(
  items: TItem[],
  search: string,
  options?: Fuse.IFuseOptions<TItem>
): TItem[] {
  const fuse = new Fuse(items, options)
  return fuse.search(search).map(({ item }) => item)
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
