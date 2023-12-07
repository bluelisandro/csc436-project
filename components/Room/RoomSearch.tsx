import { sql } from '@vercel/postgres'

export default async function Search(input) {
  let data: any

  try {
    // alert("Searching for fname: " + input)
    data = await sql`SELECT * FROM rooms where roomnumber LIKE ${'%' + input + '%'};`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: res } = data

  return res
}
