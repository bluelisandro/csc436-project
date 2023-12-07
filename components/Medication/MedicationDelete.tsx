import { sql } from '@vercel/postgres'

export default async function Delete(id) {
  let data: any

  try {
    alert("Deleted entry MID = " + id)
    await sql`DELETE FROM medication WHERE mid = ${id};`
    data = await sql`SELECT * FROM medication;`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: medications } = data

  return medications
}
