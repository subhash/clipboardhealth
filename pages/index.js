import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useCallback, useEffect, useState } from 'react'

export default function Home(props) {
  const [ hospitals, setHospitals ] = useState([])
  const fetchHospitals = useCallback(async () => {
    const res = await fetch('/api/jobs')
    const hospitals = await res.json()
    setHospitals(hospitals.jobs)
  })
  useEffect(() => fetchHospitals(), [])
  console.log(hospitals)
  return (
    <div className={styles.container}>
      { hospitals.map(h => Hospital(h))}
    </div>
  )
}

function Hospital(hospital) {
  return (
  <div>{hospital.total_jobs_in_hospital} jobs for {hospital.name}</div>
  )
}
