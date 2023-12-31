import { sql } from '@vercel/postgres'

export default async function Fetch() {
  let data: any

  try {
    data = await sql`SELECT * FROM patient`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: patients } = data

  return patients
}
