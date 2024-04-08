'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function SchemaView() {
  const [schemas, setSchemas] = useState([])
  useEffect(() => {
    fetchSchemas()
  }, [])
  const router = useRouter()

  async function fetchSchemas() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const response: any = await fetch(`/api/schema?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}`)
      const data = await response.json()
      const newSchemas = data?.schemas?.map((schema: any) => schema.schema_name) || []
      setSchemas(newSchemas)
    }
  }
  return (
    <main className="flex h-screen bg-red-300 flex-col items-center p-24 justify-between">
      <div className="flex w-full h-24 text-[40px] font-bold">
        <p className="text-center m-auto">Schema View</p>
      </div>
      <div className="flex w-full h-96 flex-col text-[32px] justify-between">
        {
          schemas.map((schema, index) => {
            return <div key={index} className="m-3 underline text-center cursor-pointer" onClick={() => router.push(`/schema/${schema}`)}>{schema}</div>
          })
        }
      </div>
    </main>
  )
}