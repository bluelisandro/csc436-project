import { sql } from '@vercel/postgres'

export default async function Fetch() {
  let data: any

  try {
    data = await sql`SELECT * FROM employee`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: patients } = data

  return patients
}
