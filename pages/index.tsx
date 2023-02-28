import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PayCode Challenge</title>
        <meta name="description" content="Project created for Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className='text-2xl'>PayCode Challenge</h1>
        <Link href="/dashboard" className='text-xl font-bold'>Ir a Dashboard</Link>
      </main>
    </>
  )
}
