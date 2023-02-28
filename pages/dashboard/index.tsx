import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { deleteCookie, getCookie } from "cookies-next"
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

  const getData = () => {
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

  const logoutEvent = () => {
    deleteCookie('session')
    router.push('/login')
  }

  return (
    <>
      <div className="container mx-auto my-4 p-4">
        <div className="flex flex-col">
          <div className="w-full p-2 text-2xl font-semibold text-slate-800 mb-2 flex justify-between">
            Bienvenido {profile.name}
            <button 
              className="text-slate-600 bg-slate-300 hover:bg-slate-400 font-bold rounded-lg text-sm p-2 flex items-center"
              onClick={logoutEvent}>
                <svg className="mr-2" width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12L13 12" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
            </button>
          </div>
          <div className="w-full p-2 text-lg font-semibold text-slate-500">Reporte de <span className="text-slate-700">Hoy</span></div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-2">
              <DetailCard
                title='Ingresos'
                value={currencyFormat(report.revenuePerHour?.reduce((a,b) => a + b))}
                valueType='cash'
                percentage=''>
                  <CustomLineChart data={report.revenuePerHour}/>
              </DetailCard>
            </div>
            <div className="w-full md:w-1/2 flex flex-col p-2">
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
    </>
  )
}