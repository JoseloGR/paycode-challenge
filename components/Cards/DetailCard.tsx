import CustomBadge from "../Badges/Badge"

export default function DetailCard(props: {
  title: string,
  value: string,
  valueType: string,
  percentage: string | undefined,
  children: any
}) {
  return (
    <div className="block max-w-sm rounded-log bg-white p-4 shadow-lg mb-4">
      <h6 className="flex justify-between">
        <div className="text-base text-neutral-600 text-sm">
          {props.title}
        </div>
        {props.percentage &&
          <CustomBadge
            percentage={props.percentage}
            increment={true}/>
        }
      </h6>
      <h5 className="leading-tight text-neutral-800">
        <span className="text-2xl font-bold ">
          {props.value}
        </span>
        {props.valueType == 'cash' && <small> MXN</small>}
      </h5>
      {props.children}
    </div>
  )
}