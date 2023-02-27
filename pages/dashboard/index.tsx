import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { URL_BASE } from "@/lib/consts/api"
import { IProfile } from "@/lib/interfaces/Profile"
import { IReport } from "@/lib/interfaces/Report"
import DetailCard from "@/components/Cards/DetailCard"
import CustomLineChart from "@/components/Charts/CustomLineChart"
import currencyFormat from "@/lib/utils/format"
import computePercentage from "@/lib/utils/percentage"

export default function Dashboard() {
  const [profile, setProfile] = useState<IProfile>({})
  const [report, setReport] = useState<IReport>({})
  const router = useRouter()

  function getData() {
    const token = getCookie('session')
    if (!token) {
      router.push('/login')
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    Promise.all([
      fetch(`${URL_BASE}/me`, {headers: headers})
        .then(resp => resp.json()),
      fetch(`${URL_BASE}/report`, {headers: headers})
        .then((resp) => resp.json())
    ]).then(responses => {
      setProfile(responses[0])
      setReport(responses[1])
    }).catch((error) => {})
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container mx-auto my-4 p-4">
        <div className="flex flex-col">
          <div className="w-full p-2 text-2xl font-semibold text-slate-800 mb-2">Bienvenido {profile.name}</div>
          <div className="w-full p-2 text-lg font-semibold text-slate-500">Reporte de <span className="text-slate-700">Hoy</span></div>
          <div className="w-full p-2">
            <div className="flex flex-row">
              <div className="w-full md:w-1/2">
                <DetailCard
                  title='Ingresos'
                  value={currencyFormat(report.revenuePerHour?.reduce((a,b) => a + b))}
                  valueType='cash'
                  percentage=''>
                    <CustomLineChart data={report.revenuePerHour}/>
                </DetailCard>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <DetailCard
                  title='Ticket promedio'
                  value={currencyFormat(report.averageTicket)}
                  valueType='cash'
                  percentage={computePercentage(report.previousDay?.averageTicket, report.averageTicket)}>
                </DetailCard>
                <DetailCard
                  title='Ticket tope'
                  value={currencyFormat(report.topTicket)}
                  valueType='cash'
                  percentage={computePercentage(report.previousDay?.topTicket, report.topTicket)}>
                </DetailCard>
                <DetailCard
                  title='Método de pago más usado'
                  value={`${report.topPaymentMethod}`}
                  valueType='text'
                  percentage=''>
                </DetailCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}