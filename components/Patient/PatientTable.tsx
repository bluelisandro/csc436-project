import RefreshButton from '@/components/refresh-button';
import { useState, useEffect } from 'react';

import Patient from '@/lib/patient';
import Fetch from '@/components/Patient/PatientFetch';
import Delete from '@/components/Patient/PatientDelete';
import Search from '@/components/Patient/PatientSearch'
import Insert from '@/components/Patient/Insert'
import Update from '@/components/Patient/PatientUpdate'

// Inside PatientTable function in PatientTable.tsx
interface PatientTableProps {
  tableState: string;
  setTableState: React.Dispatch<React.SetStateAction<string>>;
  actionInput: any;
}

export default function PatientTable({ tableState, setTableState, actionInput }: PatientTableProps) {
  const [data, setData] = useState<Patient[]>([]);

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
      else if (tableState === 'insert') {
        result = await Insert(actionInput);
      }
      else if (tableState === 'update') {
        result = await Update(actionInput);
      }

      setData(result);
    }

    fetchData();
  }, [tableState, setTableState, actionInput]);

  if (!data) return <div>Loading...</div>;

  return (
   // Create card that table sits on
   <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-20 overflow-x-auto overflow-y-auto w- h-200">

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
            {patient.address}
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
