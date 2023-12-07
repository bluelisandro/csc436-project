import { sql } from '@vercel/postgres'

export default async function Delete(id) {
  let data: any

  try {
    alert("Deleted entry RoomID = " + id)
    await sql`DELETE FROM medication WHERE roomid = ${id};`
    data = await sql`SELECT * FROM rooms;`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: rooms } = data

  return rooms
}
