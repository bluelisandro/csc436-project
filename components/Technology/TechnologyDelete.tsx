import { sql } from '@vercel/postgres'

export default async function Delete() {
  let data: any

  try {
    alert("deleting...")
    await sql`DELETE FROM technology WHERE pid = 11;`
    data = await sql`SELECT * FROM technology;`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: tech } = data

  return tech
}
