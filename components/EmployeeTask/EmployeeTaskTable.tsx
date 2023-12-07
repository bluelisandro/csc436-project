import { useState, useEffect } from 'react'

import RefreshButton from '../refresh-button'

import EmployeeTask from '@/lib/employeetask'
import Fetch from '@/components/EmployeeTask/EmployeeTaskFetch'
import Delete from '@/components/EmployeeTask/EmployeeTaskDelete';
import Search from '@/components/EmployeeTask/EmployeeTaskSearch';

interface EmployeeTaskTableProps {
  tableState: string;
  setTableState: React.Dispatch<React.SetStateAction<string>>;
  actionInput: string; // Add actionInput prop
}

export default function EmployeeTaskTable({ tableState, setTableState, actionInput }: EmployeeTaskTableProps) {
  const [data, setData] = useState<EmployeeTask[]>([]);

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
    <div className="bg-white/30 py-10 px-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-20 overflow-x-auto overflow-y-auto h-200">

      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Employee Tasks</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="grid grid-cols-5 gap-0">
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Task ID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Employee ID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Description</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Deadline</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Status</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((task) => (
        <div key={task.taskid} className="grid grid-cols-5 gap-0">
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {task.taskid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {task.employeeid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {task.taskdescription}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {task.deadline.toLocaleDateString()} {/* Format date as needed */}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {task.status}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
