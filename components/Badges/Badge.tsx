export default function CustomBadge(props: {percentage: string, increment: boolean}){
  return (
    <div className={`bg-${props.increment ? "green" : "red"}-200 text-${props.increment ? "green" : "red"}-800 text-xs font-medium mr-2 px-3 py-0.5 rounded-full`}>
      {props.percentage}
    </div>
  )
}