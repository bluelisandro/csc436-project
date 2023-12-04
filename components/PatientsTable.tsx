"use client";
import Fetch from './FetchPatients'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import { seed } from '@/lib/seed'
import { useState, useEffect } from 'react'

import Patient from '@/lib/schemata'

export default function Table() {
  // const patients = await Fetch()

  const [data, setData] = useState<Patient[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Replace this with your actual fetch call
      const result = await Fetch();
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    // Create card that table sits on
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">

      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Patients</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="grid grid-cols-9 gap-0">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">PID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Fname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Lname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">DOB</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Reason for Check-in</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Insurance #</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Address</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Sex</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">DID</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((patient) => (
        <div key={patient.pid} className="grid grid-cols-9 gap-0">
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.pid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.fname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.lname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.dob}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.reasonforcheckingin}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.insurance_no}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.address.street + ", " + patient.address.city + ", " + patient.address.state + ", " + patient.address.zip}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.sexual_orientation}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {patient.doctorid}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
