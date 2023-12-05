"use client";
import Fetch from '@/components/MedicationFetch'
import RefreshButton from './refresh-button'
import { useState, useEffect } from 'react'

import Medication from '@/lib/medication'

export default function MedicationTable() {
  const [data, setData] = useState<Medication[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Replace this with your actual fetch call
      const result = await Fetch();
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) return <div className="bold text-xl justify-center">Loading...</div>;

  return (
    // Create card that table sits on
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full ">

      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Medications</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="grid grid-cols-7 gap-0">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Mname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Exp. Date</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Price</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Company</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Amount</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Med Type</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">MID</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((medication) => (
        <div key={medication.mid} className="grid grid-cols-7 gap-0">
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.mid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.mname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.medtype}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.price}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.amount}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.company}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {medication.expiration_date}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
