import { sql } from '@vercel/postgres'

export default async function Delete(id) {
  let data: any

  try {
    alert("Deleted entry PID = " + id)
    await sql`DELETE FROM patient WHERE pid = ${id};`
    data = await sql`SELECT * FROM patient;`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: patients } = data

  return patients
}
