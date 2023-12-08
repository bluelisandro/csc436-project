"use client";
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useState, useEffect } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

// Components
import PatientTable from '@/components/Patient/PatientTable'
import EmployeeTable from '@/components/Employee/EmployeeTable'
import MedicationTable from '@/components/Medication/MedicationTable'
import RoomTable from '@/components/Room/RoomTable'
import EmployeeTasksTable from '@/components/EmployeeTask/EmployeeTaskTable'
import TechnologyTable from '@/components/Technology/TechnologyTable'
import TablePlaceholder from '@/components/TablePlaceholder'
import Patient from '@/lib/patient'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  // Store current table being shown in currentTable
  const [currentTable, setCurrentTable] = useState('PatientTable'); // Default to PatientTable
  const [actionInput, setActionInput] = useState<any>(); // ID passed into correct table component to be deleted
  const [tableState, setTableState] = useState('all') // all, delete, fnameSearch
  const [inputValue, setInputValue] = useState('') // Input value from the delete and search input fields

  const [insertValues, setInsertValues] = useState({
    pid: '',
    fname: '',
    lname: '',
    dob: '',
    reasonforcheckingin: '',
    insurance_no: '',
    address: '',
    sexual_orientation: '',
    doctorid: ''
  })

  const [deletePlaceholder, setDeletePlaceholder] = useState('Input')
  const [searchPlaceholder, setSearchPlaceholder] = useState('Input')

  const handlePID = (e) => {
    setInsertValues({ ...insertValues, pid: e.target.value })
  }

  const handleFname = (e) => {
    setInsertValues({ ...insertValues, fname: e.target.value })
  }

  const handleLname = (e) => {
    setInsertValues({ ...insertValues, lname: e.target.value });
  };

  const handleDOB = (e) => {
    setInsertValues({ ...insertValues, dob: e.target.value });
  };

  const handleReasonForCheckingIn = (e) => {
    setInsertValues({ ...insertValues, reasonforcheckingin: e.target.value });
  };

  const handleInsuranceNo = (e) => {
    setInsertValues({ ...insertValues, insurance_no: e.target.value });
  };

  const handleAddress = (e) => {
    setInsertValues({ ...insertValues, address: e.target.value });
  };

  const handleSexualOrientation = (e) => {
    setInsertValues({ ...insertValues, sexual_orientation: e.target.value });
  };

  const handleDoctorID = (e) => {
    setInsertValues({ ...insertValues, doctorid: e.target.value });
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault()
    setTableState('insert')
    setActionInput(insertValues)
    setInsertValues({
      pid: '',
      fname: '',
      lname: '',
      dob: '',
      reasonforcheckingin: '',
      insurance_no: '',
      address: '',
      sexual_orientation: '',
      doctorid: ''
    })
  }

  const handleTableSwitch = (tableName: string) => {
    setCurrentTable(tableName);
    setTableState('all');
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    setTableState('delete');
    setActionInput(inputValue); // Pass input value to state or directly to the table component as needed
    setInputValue(''); // Clear the input field after submission
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTableState('search');
    setActionInput(inputValue); // Pass input value to state or directly to the table component as needed
    setInputValue(''); // Clear the input field after submission
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Change the placeholder text for the delete and search input fields based on the current table
  useEffect(() => {
    function setPlaceholders() {
      if (currentTable === 'PatientTable') {
        setDeletePlaceholder('Enter PID');
        setSearchPlaceholder('Enter First Name');
      }
      else if (currentTable === 'EmployeeTable') {
        setDeletePlaceholder('Enter EID');
        setSearchPlaceholder('Enter First Name');
      }
      else if (currentTable === 'MedicationTable') {
        setDeletePlaceholder('Enter MID');
        setSearchPlaceholder('Enter Medication Name');
      }
      else if (currentTable === 'RoomTable') {
        setDeletePlaceholder('Enter Room ID');
        setSearchPlaceholder('Enter Room Number');
      }
      else if (currentTable === 'EmployeeTaskTable') {
        setDeletePlaceholder('Enter Task ID');
        setSearchPlaceholder('Enter Task Description');
      }
      else if (currentTable === 'TechnologyTable') {
        setDeletePlaceholder('Enter Serial Number');
        setSearchPlaceholder('Enter Tname');
      }
    }

    setPlaceholders();
  }, [currentTable]);

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
      <div className="flex mt-2 items-center">
        <h4 className="text-gray-600 text-md font-semibold mr-4 mb-6">Tables</h4> {/* Changed: Added 'mr-4' for margin */}

        {/* View Patients Button */}
        <div
          onClick={() => handleTableSwitch('PatientTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'PatientTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Patients</p>
          <ExpandingArrow />
        </div>

        {/* View Employees Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Employees</p>
          <ExpandingArrow />
        </div>

        {/* View Medications Button */}
        <div
          onClick={() => handleTableSwitch('MedicationTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'MedicationTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Medications</p>
          <ExpandingArrow />
        </div>

        {/* View Rooms Button */}
        <div
          onClick={() => handleTableSwitch('RoomTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'RoomTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Rooms</p>
          <ExpandingArrow />
        </div>

        {/* View Technology Button */}
        <div
          onClick={() => handleTableSwitch('TechnologyTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'TechnologyTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Technology</p>
          <ExpandingArrow />
        </div>

        {/* View EmployeeTasks Button */}
        <div
          onClick={() => handleTableSwitch('EmployeeTaskTable')}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === 'EmployeeTaskTable' ? 'bg-blue-400 font-extrabold text-white/100' : 'bg-white/30'} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === 'PatientTable' ? 'bg-blue-400' : 'bg-white'} duration-40`}
        >
          <p>Employee Tasks</p>
          <ExpandingArrow />
        </div>

      </div>
      {/* ----- End Table View Buttons -----*/}


      {/* ----- Start Table Action Buttons-----*/}
      <div className="flex mt-0 items-center">
        <h4 className="text-gray-600 text-md font-semibold mr-4 mb-6">Actions</h4>

        {/* ----- Delete -----*/}
        <form onSubmit={handleDeleteSubmit}>
          <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-red-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40">
            <input
              type="text"
              placeholder={deletePlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-400 rounded-md px-4 py-1 text-white font-medium hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Delete
            </button>
            <ExpandingArrow />
          </div>
        </form>

        {/* ----- Search -----*/}
        <form onSubmit={handleSearchSubmit}>
          <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-blue-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-400 rounded-md px-4 py-1 text-white font-medium hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Search
            </button>
            <ExpandingArrow />
          </div>
        </form>

      </div>

      {currentTable === 'PatientTable' ? (<div className="flex mt-0 items-center">
        {/* ----- Insert -----*/}
        <form onSubmit={handleInsertSubmit}>
          <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-green-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 px-10 py-4 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40 max-w-7xl text-sm flex-col">
            <div>
              <input
                type="text"
                placeholder="pid"
                value={insertValues.pid}
                onChange={handlePID} 
                className="border border-gray-300 rounded-md text-sm px-3 py-1 m-0 focus:outline-none focus:ring focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="fname"
                value={insertValues.fname}
                onChange={handleFname} 
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="lname"
                value={insertValues.lname}
                onChange={handleLname} 
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="dob"
                value={insertValues.dob}
                onChange={handleDOB}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="reason for checking in"
                value={insertValues.reasonforcheckingin}
                onChange={handleReasonForCheckingIn}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
            </div>
            <div className="">
              <input
                type="text"
                placeholder="insurance number"
                value={insertValues.insurance_no}
                onChange={handleInsuranceNo}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="address"
                value={insertValues.address}
                onChange={handleAddress}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="sex"
                value={insertValues.sexual_orientation}
                onChange={handleSexualOrientation}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <input
                type="text"
                placeholder="doctor ID"
                value={insertValues.doctorid}
                onChange={handleDoctorID} 
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
              />
              <button
                type="submit"
                className="bg-blue-400 rounded-md px-4 py-1 text-white font-medium hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Add to Table
              </button>
            </div>
          </div>
        </form>
      </div>) : null}

      {/* ----- End Table Action Buttons -----*/}


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
              currentTable === 'PatientTable' ? <PatientTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                currentTable === 'EmployeeTable' ? <EmployeeTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                  currentTable === 'MedicationTable' ? <MedicationTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                    currentTable === 'RoomTable' ? <RoomTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                      currentTable === 'EmployeeTaskTable' ? <EmployeeTasksTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                        currentTable === 'TechnologyTable' ? <TechnologyTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
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