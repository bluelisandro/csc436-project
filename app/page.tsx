"use client";
import Image from "next/image"
import Link from "next/link"
import { Suspense, useState, useEffect } from "react"
import ExpandingArrow from "@/components/expanding-arrow"

// Components
import PatientTable from "@/components/Patient/PatientTable"
import EmployeeTable from "@/components/Employee/EmployeeTable"
import MedicationTable from "@/components/Medication/MedicationTable"
import RoomTable from "@/components/Room/RoomTable"
import EmployeeTasksTable from "@/components/EmployeeTask/EmployeeTaskTable"
import TechnologyTable from "@/components/Technology/TechnologyTable"
import TablePlaceholder from "@/components/TablePlaceholder"
import Patient from "@/lib/patient"

export const runtime = "edge"
export const preferredRegion = "home"
export const dynamic = "force-dynamic"

export default function Home() {
  // Store current table being shown in currentTable
  const [currentTable, setCurrentTable] = useState("PatientTable"); // Default to PatientTable
  const [actionInput, setActionInput] = useState<any>(); // ID passed into correct table component to be deleted
  const [tableState, setTableState] = useState("all") // all, delete, fnameSearch
  const [inputValue, setInputValue] = useState("") // Input value from the delete and search input fields
  const [deletePlaceholder, setDeletePlaceholder] = useState("Input")
  const [searchPlaceholder, setSearchPlaceholder] = useState("Input")

  // *************-------------------- Patient Insert and Update --------------------*************
  const [insertPatientValues, setInsertPatientValues] = useState({ pid: '', fname: '', lname: '', dob: '', reasonforcheckingin: '', insurance_no: '', address: '', sexual_orientation: '', doctorid: '', })
  const [updatePatientValues, setUpdatePatientValues] = useState({ insurance_no: "", pid: "" })

  // ----- Insert -----
  const handleInsertPatientPid = (e) => {
    setInsertPatientValues({ ...insertPatientValues, pid: e.target.value })
  }

  const handleInsertPatientFname = (e) => {
    setInsertPatientValues({ ...insertPatientValues, fname: e.target.value })
  }

  const handleInsertPatientLname = (e) => {
    setInsertPatientValues({ ...insertPatientValues, lname: e.target.value });
  };

  const handleInsertPatientDob = (e) => {
    setInsertPatientValues({ ...insertPatientValues, dob: e.target.value });
  };

  const handleInsertPatientReasonForCheckingIn = (e) => {
    setInsertPatientValues({ ...insertPatientValues, reasonforcheckingin: e.target.value });
  };

  const handleInsertPatientInsuranceNo = (e) => {
    setInsertPatientValues({ ...insertPatientValues, insurance_no: e.target.value });
  };

  const handleInsertPatientAddress = (e) => {
    setInsertPatientValues({ ...insertPatientValues, address: e.target.value });
  };

  const handleInsertPatientSexualOrientation = (e) => {
    setInsertPatientValues({ ...insertPatientValues, sexual_orientation: e.target.value });
  };

  const handleInsertPatientDoctorID = (e) => {
    setInsertPatientValues({ ...insertPatientValues, doctorid: e.target.value });
  };

  const handleInsertPatientSubmit = (e) => {
    e.preventDefault()
    setTableState("insert")
    setActionInput(insertPatientValues)
    setInsertPatientValues({
      pid: "",
      fname: "",
      lname: "",
      dob: "",
      reasonforcheckingin: "",
      insurance_no: "",
      address: "",
      sexual_orientation: "",
      doctorid: ""
    })
  }

  // ----- Update ---
  const handleUpdatePatientSubmit = (e) => {
    e.preventDefault()
    setTableState("update")
    setActionInput(updatePatientValues)
    setUpdatePatientValues({ insurance_no: "", pid: "" })
  }

  const handleUpdatePatientPID = (e) => {
    setUpdatePatientValues({ ...updatePatientValues, pid: e.target.value });
  };

  const handleUpdatePatientInsuranceNo = (e) => {
    setUpdatePatientValues({ ...updatePatientValues, insurance_no: e.target.value });
  };

  // *************-------------------- Employee Insert and Update --------------------*************

  // ----- Insert -----
  const [insertEmployeeValues, setInsertEmployeeValues] = useState({ eid: '', fname: '', lname: '', salary: '', address: '', etype: '', })

  const handleInsertEmployeeEid = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, eid: e.target.value })
  }

  const handleInsertEmployeeFname = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, fname: e.target.value })
  }

  const handleInsertEmployeeLname = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, lname: e.target.value });
  };

  const handleInsertEmployeeSalary = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, salary: e.target.value });
  };

  const handleInsertEmployeeAddress = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, address: e.target.value });
  };

  const handleInsertEmployeeEtype = (e) => {
    setInsertEmployeeValues({ ...insertEmployeeValues, etype: e.target.value });
  };

  const handleInsertEmployeeSubmit = (e) => {
    e.preventDefault()
    setTableState("insert")
    setActionInput(insertEmployeeValues)
    setInsertEmployeeValues({
      eid: "",
      fname: "",
      lname: "",
      salary: "",
      address: "",
      etype: "",
    })
  }

  // ----- Update -----
  const [updateEmployeeValues, setUpdateEmployeeValues] = useState({ salary: "", eid: "" })

  const handleUpdateEmployeeSubmit = (e) => {
    e.preventDefault()
    setTableState("update")
    setActionInput(updateEmployeeValues)
    setUpdateEmployeeValues({ salary: "", eid: "" })
  }

  const handleUpdateEmployeeEid = (e) => {
    setUpdateEmployeeValues({ ...updateEmployeeValues, eid: e.target.value });
  };

  const handleUpdateEmployeeSalary = (e) => {
    setUpdateEmployeeValues({ ...updateEmployeeValues, salary: e.target.value });
  };



  // *************-------------------- Medication Insert and Update --------------------*************
  const [insertMedicationValues, setInsertMedicationValues] = useState({ mname: '', expiration_date: '', price: '', company: '', amount: '', medtype: '', mid: '', })

  const handleInsertMedicationMname = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, mname: e.target.value })
  }

  const handleInsertMedicationExpirationDate = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, expiration_date: e.target.value })
  }

  const handleInsertMedicationPrice = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, price: e.target.value });
  };

  const handleInsertMedicationCompany = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, company: e.target.value });
  };

  const handleInsertMedicationAmount = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, amount: e.target.value });
  };

  const handleInsertMedicationMedtype = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, medtype: e.target.value });
  };

  const handleInsertMedicationMid = (e) => {
    setInsertMedicationValues({ ...insertMedicationValues, mid: e.target.value });
  };

  const handleInsertMedicationSubmit = (e) => {
    e.preventDefault()
    setTableState("insert")
    setActionInput(insertMedicationValues)
    setInsertMedicationValues({
      mname: "",
      expiration_date: "",
      price: "",
      company: "",
      amount: "",
      medtype: "",
      mid: "",
    })
  }

  // *************-------------------- Technology Insert and Update --------------------*************
  const [insertTechnologyValues, setInsertTechnologyValues] = useState({ tname: '', datelastused: '', serial_number: '', usagedescription: '', manufacturer: '', })

  const handleInsertTechnologyTname = (e) => {
    setInsertTechnologyValues({ ...insertTechnologyValues, tname: e.target.value })
  }

  const handleInsertTechnologyDatelastused = (e) => {
    setInsertTechnologyValues({ ...insertTechnologyValues, datelastused: e.target.value })
  }

  const handleInsertTechnologySerialNumber = (e) => {
    setInsertTechnologyValues({ ...insertTechnologyValues, serial_number: e.target.value });
  };

  const handleInsertTechnologyUsageDescription = (e) => {
    setInsertTechnologyValues({ ...insertTechnologyValues, usagedescription: e.target.value });
  };

  const handleInsertTechnologyManufacturer = (e) => {
    setInsertTechnologyValues({ ...insertTechnologyValues, manufacturer: e.target.value });
  };

  const handleInsertTechnologySubmit = (e) => {
    e.preventDefault()
    setTableState("insert")
    setActionInput(insertTechnologyValues)
    setInsertTechnologyValues({
      tname: "",
      datelastused: "",
      serial_number: "",
      usagedescription: "",
      manufacturer: "",
    })
  }

  // *************-------------------- Room Insert and Update --------------------*************
  const [insertRoomValues, setInsertRoomValues] = useState({ roomid: '', roomnumber: '', roomtypeid: '', capacity: '', availability: '', })

  const handleInsertRoomRoomid = (e) => {
    setInsertRoomValues({ ...insertRoomValues, roomid: e.target.value })
  }

  const handleInsertRoomRoomnumber = (e) => {
    setInsertRoomValues({ ...insertRoomValues, roomnumber: e.target.value })
  }

  const handleInsertRoomRoomtypeid = (e) => {
    setInsertRoomValues({ ...insertRoomValues, roomtypeid: e.target.value });
  };

  const handleInsertRoomCapacity = (e) => {
    setInsertRoomValues({ ...insertRoomValues, capacity: e.target.value });
  };

  const handleInsertRoomAvailability = (e) => {
    setInsertRoomValues({ ...insertRoomValues, availability: e.target.value });
  };

  const handleInsertRoomSubmit = (e) => {
    e.preventDefault()
    setTableState("insert")
    setActionInput(insertRoomValues)
    setInsertRoomValues({
      roomid: "",
      roomnumber: "",
      roomtypeid: "",
      capacity: "",
      availability: "",
    })
  }

  // *************-------------------- Functions --------------------*************

  const handleTableSwitch = (tableName: string) => {
    setCurrentTable(tableName);
    setTableState("all");
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    setTableState("delete");
    setActionInput(inputValue); // Pass input value to state or directly to the table component as needed
    setInputValue(""); // Clear the input field after submission
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTableState("search");
    setActionInput(inputValue); // Pass input value to state or directly to the table component as needed
    setInputValue(""); // Clear the input field after submission
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Change the placeholder text for the delete and search input fields based on the current table
  useEffect(() => {
    function setPlaceholders() {
      if (currentTable === "PatientTable") {
        setDeletePlaceholder("Enter PID");
        setSearchPlaceholder("Enter First Name");
      }
      else if (currentTable === "EmployeeTable") {
        setDeletePlaceholder("Enter EID");
        setSearchPlaceholder("Enter First Name");
      }
      else if (currentTable === "MedicationTable") {
        setDeletePlaceholder("Enter MID");
        setSearchPlaceholder("Enter Medication Name");
      }
      else if (currentTable === "RoomTable") {
        setDeletePlaceholder("Enter Room ID");
        setSearchPlaceholder("Enter Room Number");
      }
      else if (currentTable === "EmployeeTaskTable") {
        setDeletePlaceholder("Enter Task ID");
        setSearchPlaceholder("Enter Task Description");
      }
      else if (currentTable === "TechnologyTable") {
        setDeletePlaceholder("Enter Serial Number");
        setSearchPlaceholder("Enter Tname");
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
        <h4 className="text-gray-600 text-md font-semibold mr-4 mb-6">Tables</h4> {/* Changed: Added "mr-4" for margin */}

        {/* View Patients Button */}
        <div
          onClick={() => handleTableSwitch("PatientTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "PatientTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
        >
          <p>Patients</p>
          <ExpandingArrow />
        </div>

        {/* View Employees Button */}
        <div
          onClick={() => handleTableSwitch("EmployeeTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "EmployeeTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
        >
          <p>Employees</p>
          <ExpandingArrow />
        </div>

        {/* View Medications Button */}
        <div
          onClick={() => handleTableSwitch("MedicationTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "MedicationTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
        >
          <p>Medications</p>
          <ExpandingArrow />
        </div>

        {/* View Rooms Button */}
        <div
          onClick={() => handleTableSwitch("RoomTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "RoomTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
        >
          <p>Rooms</p>
          <ExpandingArrow />
        </div>

        {/* View Technology Button */}
        <div
          onClick={() => handleTableSwitch("TechnologyTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "TechnologyTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
        >
          <p>Technology</p>
          <ExpandingArrow />
        </div>

        {/* View EmployeeTasks Button */}
        <div
          onClick={() => handleTableSwitch("EmployeeTaskTable")}
          className={`group mx-4 mb-6 sm:mt-0 rounded-full flex space-x-1 ${currentTable === "EmployeeTaskTable" ? "bg-blue-400 font-extrabold text-white/100" : "bg-white/30"} shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-lg font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:${currentTable === "PatientTable" ? "bg-blue-400" : "bg-white"} duration-40`}
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

      {/* ----- Start Patient Table Insert Form -----*/}
      {currentTable === "PatientTable" ? (
        <div className="flex mt-0 items-center">
          {/* ----- Insert -----*/}
          <form onSubmit={handleInsertPatientSubmit}>
            <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-green-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 px-10 py-4 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40 max-w-7xl text-sm flex-col">
              <div>
                <input
                  type="text"
                  placeholder="pid"
                  value={insertPatientValues.pid}
                  onChange={handleInsertPatientPid}
                  className="border border-gray-300 rounded-md text-sm px-3 py-1 m-0 focus:outline-none focus:ring focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="fname"
                  value={insertPatientValues.fname}
                  onChange={handleInsertPatientFname}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="lname"
                  value={insertPatientValues.lname}
                  onChange={handleInsertPatientLname}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="dob"
                  value={insertPatientValues.dob}
                  onChange={handleInsertPatientDob}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="reason for checking in"
                  value={insertPatientValues.reasonforcheckingin}
                  onChange={handleInsertPatientReasonForCheckingIn}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="insurance number"
                  value={insertPatientValues.insurance_no}
                  onChange={handleInsertPatientInsuranceNo}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="address"
                  value={insertPatientValues.address}
                  onChange={handleInsertPatientAddress}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="sex"
                  value={insertPatientValues.sexual_orientation}
                  onChange={handleInsertPatientSexualOrientation}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="doctor ID"
                  value={insertPatientValues.doctorid}
                  onChange={handleInsertPatientDoctorID}
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
          {/*-----  End Patient Table Insert Form -----*/}


          {/*-----  Start Patient Update Form -----*/}
          <div className="flex mt-0 items-center">
            {/* ----- Update -----*/}
            <form onSubmit={handleUpdatePatientSubmit}>
              <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-orange-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 px-10 py-4 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40 max-w-7xl text-sm flex-col">
                <div>
                  <input
                    type="text"
                    placeholder="PID"
                    value={updatePatientValues.pid}
                    onChange={handleUpdatePatientPID}
                    className="border border-gray-300 rounded-md text-sm px-3 py-1 m-0 focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Insurance No."
                    value={updatePatientValues.insurance_no}
                    onChange={handleUpdatePatientInsuranceNo}
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-400 rounded-md px-4 py-1 text-white font-medium hover:bg-blue-500 transition duration-300 ease-in-out"
                >
                  Update Patient"s Insurance No. by PID
                </button>
              </div>
            </form>
          </div>
          {/*-----  End Patient Update Form -----*/}
        </div>



      ) : null}

      {/*-----  Start Employee Insert and Update Form -----*/}
      {currentTable === "EmployeeTable" ? (
        <div className="flex mt-0 items-center">
          {/* ----- Insert -----*/}
          <form onSubmit={handleInsertEmployeeSubmit}>
            <div
              className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-green-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 px-10 py-4 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40 max-w-7xl text-sm flex-col"
            >
              <div>
                <input
                  type="text"
                  placeholder="eid"
                  value={insertEmployeeValues.eid}
                  onChange={handleInsertEmployeeEid}
                  className="border border-gray-300 rounded-md text-sm px-3 py-1 m-0 focus:outline-none focus:ring focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="fname"
                  value={insertEmployeeValues.fname}
                  onChange={handleInsertEmployeeFname}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="lname"
                  value={insertEmployeeValues.lname}
                  onChange={handleInsertEmployeeLname}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="salary"
                  value={insertEmployeeValues.salary}
                  onChange={handleInsertEmployeeSalary}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
                <input
                  type="text"
                  placeholder="address"
                  value={insertEmployeeValues.address}
                  onChange={handleInsertEmployeeAddress}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="etype"
                  value={insertEmployeeValues.etype}
                  onChange={handleInsertEmployeeEtype}
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

          {/* ----- Update -----*/}
          <form onSubmit={handleUpdateEmployeeSubmit}>
            <div className="group mx-4 mb-6 mt-0 rounded-full flex space-x-4 bg-orange-500 shadow-sm ring-1 ring-gray-900/5 text-gray-600 px-10 py-4 hover:shadow-lg active:shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-40 max-w-7xl text-sm flex-col">
              <div>
                <input
                  type="text"
                  placeholder="EID"
                  value={updateEmployeeValues.eid}
                  onChange={handleUpdateEmployeeEid}
                  className="border border-gray-300 rounded-md text-sm px-3 py-1 m-0 focus:outline-none focus:ring focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Salary"
                  value={updateEmployeeValues.salary}
                  onChange={handleUpdateEmployeeSalary}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-500 m-0"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-400 rounded-md px-4 py-1 text-white font-medium hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Update Employee"s Salary by EID
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/*-----  End Employee Insert Form -----*/}

      {/* ----- Update -----*/}

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
            currentTable === "TablePlaceHolder" ? <TablePlaceholder /> :
              currentTable === "PatientTable" ? <PatientTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                currentTable === "EmployeeTable" ? <EmployeeTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                  currentTable === "MedicationTable" ? <MedicationTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                    currentTable === "RoomTable" ? <RoomTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                      currentTable === "EmployeeTaskTable" ? <EmployeeTasksTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
                        currentTable === "TechnologyTable" ? <TechnologyTable tableState={tableState} setTableState={setTableState} actionInput={actionInput} /> :
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

    </main >
  )
}