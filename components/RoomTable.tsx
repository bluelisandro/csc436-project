"use client";
import Fetch from '@/components/RoomFetch'; // Replace with your actual Room fetching mechanism
import RefreshButton from './refresh-button';
import { useState, useEffect } from 'react';

import Room from '@/lib/room'; // Importing the Room type

export default function RoomTable() {
  const [data, setData] = useState<Room[]>([]);

  useEffect(() => {
    async function fetchData() {
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
