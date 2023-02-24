import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { URL_BASE } from "@/lib/consts/api"
import { IProfile } from "@/lib/interfaces/Profile"
import { IReport } from "@/lib/interfaces/Report"
import DetailCard from "@/components/Form/Cards/DetailCard"

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
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="w-full p-2">Bienvenido {profile.name}</div>
          <div className="w-full p-2">Reporte de Hoy</div>
          <div className="w-full p-2">
            <div className="flex flex-row">
              <div className="w-full md:w-1/2">

              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <DetailCard
                  title='Ticket promedio'
                  value={`$${report.averageTicket}`}
                  valueType='cash'
                  percentage='10%'/>
                <DetailCard
                  title='Ticket tope'
                  value={`$${report.topTicket}`}
                  valueType='cash'
                  percentage=''/>
                <DetailCard
                  title='Método de pago más usado'
                  value={`${report.topPaymentMethod}`}
                  valueType='text'
                  percentage=''/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}