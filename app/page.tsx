"use client";
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

// Components
import PatientTable from '@/components/PatientTable'
import EmployeeTable from '@/components/EmployeeTable'
import TablePlaceholder from '@/components/TablePlaceholder'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  const [currentTable, setCurrentTable] = useState('PatientTable');

  const handleTableSwitch = (tableName: string) => {
    setCurrentTable(tableName);
  };


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="https://github.com/bluelisandro/csc436-project"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>See the code on Github</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Hospital Database
      </h1>

      {/* ----- View Tables Buttons -----*/}
      <div className="flex">

        {/* View Patients Button */}
        <div
          onClick={() => handleTableSwitch('PatientTable')}
          className="group mx-10 mb-10 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          <p>Patients</p>
          <ExpandingArrow />
        </div>

        {/* View Employees Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTable')}
          className="group mt-20 mb-10 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          <p>Employees</p>
          <ExpandingArrow />
        </div>

      </div>

      <Suspense fallback={<TablePlaceholder />}>
        {
          currentTable === 'PatientTable' ? <PatientTable /> :
            currentTable === 'EmployeeTable' ? <EmployeeTable /> : <TablePlaceholder />
        }
      </Suspense>

    </main>
  )
}