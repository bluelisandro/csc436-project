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
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Link
        href="https://github.com/bluelisandro/csc436-project"
        className="group mt-10 sm:mt-6 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-6 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>See the code on Github</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-2 pb-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-5xl font-semibold tracking-tight text-transparent">
        Hospital Database
      </h1>
      <h4 className="text-gray-600 text-sm font-medium pb-8">Created by Ryan Fish and Lisandro Nunez</h4>

      {/* ----- Start Table View Buttons-----*/}
      <div className="flex mt-10 items-center">
        <h4 className="text-gray-600 text-md font-semibold mr-4 mb-6">Tables</h4> {/* Changed: Added 'mr-4' for margin */}

        {/* View Patients Button */}
        <div
          onClick={() => handleTableSwitch('PatientTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Patients</p>
          <ExpandingArrow />
        </div>

        {/* View Employees Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'EmployeeTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Employees</p>
          <ExpandingArrow />
        </div>

        {/* View Medications Button */}
        <div
          onClick={() => handleTableSwitch('MedicationTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'MedicationTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'MedicationTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Medications</p>
          <ExpandingArrow />
        </div>

        {/* View Rooms Button */}
        <div
          onClick={() => handleTableSwitch('RoomTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'RoomTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'RoomTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Rooms</p>
          <ExpandingArrow />
        </div>

        {/* View Technology Button */}
        <div
          onClick={() => handleTableSwitch('TechnologyTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'TechnologyTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'TechnologyTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Technology</p>
          <ExpandingArrow />
        </div>

        {/* View EmployeeTasks Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTasksTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTasksTable' ? 'bg-blue-400' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'EmployeeTasksTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Employee Tasks</p>
          <ExpandingArrow />
        </div>

      </div>
      {/* ----- End Table View Buttons -----*/}

      {/* ----- Render Table View Component-----*/}
      <div className="max-h-fit">
        {/* Render the selected table component */}
        <div className="w-full"></div>
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
      </div>

      {/* ----- Start Footer -----*/}
      <div className="bottom-0 w-full px-20 pb-10 mt-20 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-starter"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
      {/* ----- End Footer -----*/}

    </main>
  )
}