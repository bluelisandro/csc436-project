import { sql } from '@vercel/postgres'

export default async function Fetch() {
  let data: any

  try {
    data = await sql`SELECT * FROM rooms`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: rooms } = data

  return rooms
}
