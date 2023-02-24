import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { URL_BASE } from "@/lib/consts/api"

export default function Dashboard() {
  const [profile, setProfile] = useState({})
  const [data, setData] = useState({})
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
      setData(responses[1])
    }).catch((error) => {})
  }

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Bienvenido {profile.name}</h1>
    </>
  )
}