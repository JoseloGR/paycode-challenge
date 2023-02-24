export default function DetailCard(props: {
  title: string,
  value: string,
  valueType: string,
  percentage: string | undefined
}) {
  return (
    <div className="block max-w-sm rounded-log bg-white p-6 shadow-lg mb-4">
      <h6 className="text-base text-neutral-600 flex justify-between">
        <div>
          {props.title}
        </div>
        {props.percentage &&
          <div>
            {props.percentage}
          </div>
        }
      </h6>
      <h5 className="text-xl font-medium leading-tight text-neutral-800">
        {props.value} {props.valueType == 'cash' && 'MXN'}
      </h5>
    </div>
  )
}