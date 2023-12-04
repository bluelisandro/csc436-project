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
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">

      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Patients</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="m-2 grid grid-cols-3">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold">ID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold">Fname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold">Lname</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((patient) => (
        <div key={patient.pid} className="m-2 grid grid-cols-3">
          <div className="flex items-center justify-center border-[1px] py-4">
            {patient.pid}
          </div>
          <div className="flex items-center justify-center border-[1px] py-4">
            {patient.fname}
          </div>
          <div className="flex items-center justify-center border-[1px] py-4">
            {patient.lname}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
