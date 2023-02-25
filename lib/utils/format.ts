export default function currencyFormat(value: number | undefined) {
  if (value === undefined) {
    return '0'
  }

  return '$' + String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}