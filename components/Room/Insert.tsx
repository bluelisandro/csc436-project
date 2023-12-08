import { sql } from "@vercel/postgres"

export default async function Insert(values: any) {
  let data: any

  try {
    type Room = {
        roomid: number;
        roomnumber: string;
        roomtypeid: number;
        capacity: number;
        availability: boolean;
    };

    // insert all values using the values object
    await sql`
    INSERT INTO rooms (roomid, roomnumber, roomtypeid, capacity, availability)
    VALUES 
        (${values.roomid}, ${values.roomnumber}, ${values.roomtypeid}, ${values.capacity}, ${values.availability});`

    data = await sql`SELECT * FROM rooms;`
    
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: res } = data

  return res
}
