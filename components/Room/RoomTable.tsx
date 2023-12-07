import { useState, useEffect } from 'react';

import RefreshButton from '../refresh-button';

import Room from '@/lib/room'; // Importing the Room type
import Fetch from '@/components/Room/RoomFetch';
import Delete from '@/components/Room/RoomDelete';
import Search from '@/components/Room/RoomSearch';

interface RoomTableProps {
  tableState: string;
  setTableState: React.Dispatch<React.SetStateAction<string>>;
  actionInput: string; // Add actionInput prop
}

export default function RoomTable({ tableState, setTableState, actionInput }: RoomTableProps) {
  const [data, setData] = useState<Room[]>([]);

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
          <h2 className="text-xl font-semibold">Rooms</h2>
        </div>
        <RefreshButton />
      </div>

      {/* Table head starts */}
      <div className="grid grid-cols-5 gap-0"> {/* Adjust grid-cols based on the number of columns */}
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Room ID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Room Number</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Room Type ID</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Capacity</div>
        <div className="row-span-2 flex items-center justify-center border-[1px] text-xl font-semibold py-2 px-2">Availability</div>
      </div>
      {/* Table head ends */}
    
      {/* Table body starts */}
      {data.map((room) => (
        <div key={room.roomid} className="grid grid-cols-5 gap-0"> {/* Adjust grid-cols based on the number of columns */}
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {room.roomid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {room.roomnumber}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {room.roomtypeid}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {room.capacity}
          </div>
          <div className="flex items-center justify-center border-[2px] py-2 px-2 text-lg">
            {room.availability ? 'Available' : 'Not Available'}
          </div>
        </div>
      ))}
      {/* Table body ends */}

    </div>
  )
}
