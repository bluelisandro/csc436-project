"use client";
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

// Components
import PatientTable from '@/components/PatientTable'
import EmployeeTable from '@/components/EmployeeTable'
import MedicationTable from '@/components/MedicationTable'
import RoomTable from '@/components/RoomTable'
import EmployeeTasksTable from '@/components/EmployeeTaskTable'
import TechnologyTable from '@/components/TechnologyTable'
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

      {/* ----- Start Table View Buttons-----*/}
      <div className="flex mt-10">

        {/* View Patients Button */}
        <div
          onClick={() => handleTableSwitch('PatientTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Patients</p>
          <ExpandingArrow />
        </div>

        {/* View Employees Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Employees</p>
          <ExpandingArrow />
        </div>

        {/* View Medications Button */}
        <div
          onClick={() => handleTableSwitch('MedicationTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'MedicationTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Medications</p>
          <ExpandingArrow />
        </div>

        {/* View Rooms Button */}
        <div
          onClick={() => handleTableSwitch('RoomTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'RoomTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Rooms</p>
          <ExpandingArrow />
        </div>

        {/* View Technology Button */}
        <div
          onClick={() => handleTableSwitch('TechnologyTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'TechnologyTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Technology</p>
          <ExpandingArrow />
        </div>

        {/* View EmployeeTasks Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTasksTable')}
          className={`group mx-6 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTasksTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-40`}
        >
          <p>Employee Tasks</p>
          <ExpandingArrow />
        </div>

      </div>
      {/* ----- End Table View Buttons -----*/}

      <Suspense fallback={
        <div>
          <TablePlaceholder />
          <p className="justify-center bold text-xl">Loading.....</p>
        </div>}>
        {
          currentTable === 'TablePlaceHolder' ? <TablePlaceholder /> :
            currentTable === 'PatientTable' ? <PatientTable /> :
              currentTable === 'EmployeeTable' ? <EmployeeTable /> :
                currentTable === 'MedicationTable' ? <MedicationTable /> :
                  currentTable === 'RoomTable' ? <RoomTable /> :
                    currentTable === 'EmployeeTasksTable' ? <EmployeeTasksTable /> :
                      currentTable === 'TechnologyTable' ? <TechnologyTable /> :
                        <TablePlaceholder />
        }
      </Suspense>

    </main>
  )
}