const numFormatter = new Intl.NumberFormat('it-IT')

export function formatThousands(num: number) {
  return numFormatter.format(num)
}

export function toFormattedLongDate(ddmmyyyyDateString: string) {
  const formatDateForDateConstructor = ddmmyyyyDateString.split('/').reverse().join('-')
  const date = new Date(formatDateForDateConstructor)
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
