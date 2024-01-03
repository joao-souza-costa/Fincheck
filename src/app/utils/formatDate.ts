export function formatDate(value: Date) {
  return Intl.DateTimeFormat('pt-br').format(value)
}