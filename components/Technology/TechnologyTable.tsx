"use client";
import Fetch from './TechnologyFetch'; // Make sure to import the appropriate fetch function
import { useState, useEffect } from 'react';

import Technology from '@/lib/technology';

export default function TechnologyTable() {
  const [data, setData] = useState<Technology[]>([]);

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
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-20 overflow-x-auto overflow-y-auto h-200">

      {/* Table head starts */}
      <div className="grid grid-cols-5 gap-0">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">TName</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Date Last Used</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Serial Number</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Usage Description</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Manufacturer</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((technology) => (
        <div key={technology.serial_number} className="grid grid-cols-5 gap-0">
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {technology.tname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {technology.datelastused}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {technology.serial_number}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {technology.usagedescription}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {technology.manufacturer}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}