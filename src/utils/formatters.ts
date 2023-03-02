const numFormatter = new Intl.NumberFormat('it-IT')
export function formatThousands(num: number) {
  return numFormatter.format(num)
}
