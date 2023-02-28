import CustomBadge from "../Badges/Badge"

export default function DetailCard(props: {
  title: string,
  value: string,
  valueType: string,
  percentage: string | undefined,
  children: any
}) {
  return (
    <div className="block max-w-full rounded-md bg-white p-4 shadow-lg mb-4">
      <h6 className="flex justify-between mb-1">
        <div className="text-slate-500 text-sm font-medium">
          {props.title}
        </div>
        {props.percentage &&
          <CustomBadge
            percentage={props.percentage}/>
        }
      </h6>
      <h5 className="leading-tight text-neutral-800">
        <span className="text-2xl font-bold">
          {props.value || ''}
        </span>
        {props.valueType == 'cash' && <small className="text-slate-500 font-semibold"> MXN</small>}
      </h5>
      {props.children}
    </div>
  )
}