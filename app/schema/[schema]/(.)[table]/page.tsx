'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { AgGridReact } from '@ag-grid-community/react'; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

export default function TableView({ params }: { params: { table: string } }) {
  const [tableContent, setTableContent] = useState([])
  const [columnDefs, setColumnDefs] = useState<(ColDef<any, any> | ColGroupDef<any>)[]>([]);

  useEffect(() => {
    fetchTableContent()
  }, [])
  
  async function fetchTableContent() {
    const db = localStorage.getItem("dbsession")
    if (db) {
      const config = JSON.parse(db)
      const countresponse = await fetch(`/api/tablecontent/count?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&table=${params.table}`)
      const countdata = await countresponse.json()
      const response = await fetch(`/api/tablecontent?user=${config.user}&password=${config.password}&host=${config.host}&port=${config.port}&database=${config.database}&table=${params.table}&page=1&per_page=${countdata?.count || 1}`)
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

  const router = useRouter();

  return (
    <main className="flex w-[80%] h-screen m-auto bg-red-300 flex-col items-center p-24">
      <div className="flex w-full h-48 text-[40px] font-bold justify-between items-center">
        <p className="text-center underline">Table Content View</p>
        <button onClick={() => router.back()}>X</button>
      </div>
      <div className="w-full h-full overflow-scroll flex flex-col ag-theme-quartz">
        <AgGridReact
          rowData={tableContent}
          columnDefs={columnDefs}
        >
        </AgGridReact>
      </div>
    </main>
  );
}