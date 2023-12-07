import Fetch from './EmployeeFetch'
import RefreshButton from '../refresh-button'
import { useState, useEffect } from 'react'

import Employee from '@/lib/employee'
import Delete from '@/components/Employee/EmployeeDelete'

interface EmployeeTableProps {
  tableState: string;
  setTableState: React.Dispatch<React.SetStateAction<string>>;
  actionInput: string; // Add actionInput prop
}

export default function EmployeeTable({ tableState, setTableState, actionInput }: EmployeeTableProps) {
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchData() {
      let result;
      if (tableState === 'all') {
        result = await Fetch();
      } else if (tableState === 'delete' && actionInput) { // Check if actionInput is not empty
        result = await Delete(actionInput); // Pass the id to the Delete function
        setTableState('all');
      }
      setData(result);
    }

    fetchData();
  }, [tableState, setTableState, actionInput]);

  if (!data) return <div className="bold text-xl justify-center">Loading...</div>;

  return (
    // Create card that table sits on
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-20 overflow-x-auto">

      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Employees</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="grid grid-cols-6 gap-0">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">EID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Fname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Lname</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Salary</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Address</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Type</div>
      </div>
      {/* Table head ends */}

      {/* Table body starts */}
      {data.map((employee) => (
        <div key={employee.eid} className="grid grid-cols-6 gap-0">
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.eid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.fname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.lname}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.salary}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.address}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {employee.etype}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
