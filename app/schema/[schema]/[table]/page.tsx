'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { AgGridReact } from '@ag-grid-community/react'; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

export default function TableView({ params }: { params: { table: string } }) {
  const [tableContent, setTableContent] = useState([])
  const [columnDefs, setColumnDefs] = useState<(ColDef<any, any> | ColGroupDef<any>)[]>([]);
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchTableContentCount()
  }, [])

  useEffect(() => {
    fetchTableContent()
  }, [page])

  const router = useRouter()

  async function fetchTableContent() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const response = await fetch(`/api/tablecontent?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&table=${params.table}&page=${page}&per_page=5`)
      const data = await response.json()
      setTableContent(data)
      const newColumnDefs = Object.keys(data[0]).map(key => {
        return {
          field: key,
          headerName: key,
          minWidth: 100,
          maxWidth: 250,
          flex: 1,
        }
      });
      setColumnDefs(newColumnDefs)
    }
  }

  async function fetchTableContentCount() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const response = await fetch(`/api/tablecontent/count?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&table=${params.table}`)
      const data = await response.json()
      setTotal(data?.count || 0)
    }
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
    <main className="flex h-screen bg-red-300 flex-col items-center p-24">
      <div className="absolute top-2 right-2 font-bold cursor-pointer" onClick={() => router.back()}>Go Back</div>
      <div className="flex w-full h-48 text-[40px] font-bold justify-between">
        <p className="text-center w-[50%] underline">Table Content View</p>
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
      <div className="w-screen overflow-scroll h-full flex flex-col ag-theme-quartz">
        <AgGridReact
          rowData={tableContent}
          columnDefs={columnDefs}
        >
        </AgGridReact>
        {/* <table className="w-full text-[32px]">
          <thead className="w-full">
            {
              tableContent[0] && Object.keys(tableContent[0]).map((field, index) => {
                return <th className="m-auto border-black border-solid border-2" key={`field-${index}`}>{field}</th>
              })
            }
          </thead>
          <tbody>
            {
              tableContent.map((content, index) => {
                return <tr key={index} className="w-full border-black border-solid border-2">{
                  Object.keys(content).map((field, index) => {
                    return (<td className="underline text-center cursor-pointer m-auto border-black border-solid border-2" key={`content-${field}`}>{content[field]}</td>)
                  })
                }</tr>
              })
            }
          </tbody>
        </table> */}
      </div>
    </main>
  )
}