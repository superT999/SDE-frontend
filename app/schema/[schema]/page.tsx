'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function TableView({ params }: { params: { schema: string } }) {
  const [tables, setTables] = useState([])
  const [schemas, setSchemas] = useState([])
  const [schema, setSchema] = useState(params.schema)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    fetchSchemas()
  }, [])
  useEffect(() => {
    fetchTables()
    fetchTablesCount()
  }, [schema, page])
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

  async function fetchTables() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const response = await fetch(`/api/table?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&schema=${schema}&page=${page}&per_page=${5}`)
      const data = await response.json()
      const newTables = data?.tables || []
      setTables(newTables)
    }
  }

  async function fetchTablesCount() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const response = await fetch(`/api/table/count?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&schema=${schema}&page=${page}&per_page=${5}`)
      const data = await response.json()
      setTotal(data?.count || 0)
    }
  }

  function handleClick(table: string) {
    router.push(`/schema/table/${table}`)
  }

  function handleFirstPage() {
    setPage(1)
  }

  function handlePreviousPage() {
    if (page > 1) setPage(page - 1)
  }

  function handleNextPage() {
    if (page * 5 < total) setPage(page + 1)
  }

  function handleLastPage() {
    if (total % 5 === 0) setPage(Math.floor(total / 5))
    else setPage(Math.floor(total / 5) + 1)
  }

  return (
    <main className="flex h-screen bg-red-300 flex-col items-center p-24 justify-between">
      <div className="flex w-full h-48 text-[40px] font-bold justify-between">
        <p className="text-center w-[50%] underline">Table View</p>
        <div className="flex flex-col justify-between text-[24px] w-[50%]">
          <div className="flex flex-row justify-between w-full">
            <label>Page: </label>
            <input value={page} type="number" onChange={(e) => setPage(Number(e.target.value))} min={1} />
          </div>
          <div className="flex flex-row justify-between w-full">
            <button className="text-white" onClick={handleFirstPage}>&lt;&lt;</button>
            <button className="text-white" onClick={handlePreviousPage}>&lt;</button>
            <button className="text-white" onClick={handleNextPage}>&gt;</button>
            <button className="text-white" onClick={handleLastPage}>&gt;&gt;</button>
          </div>
          <div className="flex flex-row justify-between w-full">
            <label>Total: {total}</label>
            <label>Showing {(page - 1) * 5 + 1} ~ {page * 5 > total ? total : page * 5}</label>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full overflow-y-scroll flex-row text-[32px] justify-between">
        <div className="flex flex-col w-[30%] h-full border-black border-solid border-2">
          {
            schemas.map((schemaVal, index) => {
              return <div key={index} className="m-3 underline text-center cursor-pointer" onClick={() => setSchema(schemaVal)}>{schemaVal}</div>
            })
          }
        </div>
        <div className="flex flex-col w-[70%] h-full border-black border-solid border-2">
          {
            tables.map((table, index) => {
              return <Link key={index} className="m-3 underline text-center cursor-pointer" href={`/schema/table/${table}`}>{table}</Link>
            })
          }
        </div>
      </div>
    </main>
  )
}