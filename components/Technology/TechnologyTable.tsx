import { useState, useEffect } from 'react';

import RefreshButton from '../refresh-button'

import Technology from '@/lib/technology';
import Fetch from '@/components/Technology/TechnologyFetch'; // Make sure to import the appropriate fetch function
import Delete from '@/components/Technology/TechnologyDelete'
import Search from '@/components/Technology/TechnologySearch'

interface TechnologyTableProps {
  tableState: string;
  setTableState: React.Dispatch<React.SetStateAction<string>>;
  actionInput: string; // Add actionInput prop
}

export default function TechnologyTable({ tableState, setTableState, actionInput }: TechnologyTableProps) {
  const [data, setData] = useState<Technology[]>([]);

  useEffect(() => {
    async function fetchData() {
      let result;

      if (tableState === 'all' || actionInput === '') {
        result = await Fetch();
      } else if (tableState === 'delete' && actionInput) { // Check if actionInput is not empty
        result = await Delete(actionInput); // Pass the id to the Delete function
      }
      else if (tableState === 'search' && actionInput) {
        result = await Search(actionInput);
      }

      setData(result);
    }

    fetchData();
  }, [tableState, setTableState, actionInput]);

  if (!data) return <div className="bold text-xl justify-center">Loading...</div>;

  return (
    // Create card that table sits on
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-20 overflow-x-auto overflow-y-auto w- h-200">

      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Technology</h2>
        </div>
        <RefreshButton />
      </div>

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