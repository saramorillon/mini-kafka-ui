export function replaceAt<T>(array: T[], index: number, item: T): T[] {
  if (index === -1) return [...array, item]
  return [...array.slice(0, Number(index)), item, ...array.slice(Number(index) + 1)]
}
