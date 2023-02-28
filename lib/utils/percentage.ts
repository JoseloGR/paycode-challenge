export default function computePercentage(
  previousValue: number | undefined,
  currentValue: number | undefined
) {
  if ( previousValue === undefined || currentValue === undefined) {
    return ''
  }
  return (
    (
      (currentValue - previousValue) / currentValue
    ) 
    * 100
  )
  .toFixed()
  .toString()
  + '%'
}