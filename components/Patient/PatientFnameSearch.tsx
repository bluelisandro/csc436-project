import { sql } from '@vercel/postgres'

export default async function FnameSearch(input) {
  let data: any

  try {
    alert("Searching for fname: " + input)
    data = await sql`SELECT * FROM patient where fname = ${input}`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: patients } = data

  return patients
}
