import { sql } from '@vercel/postgres'

export default async function Fetch() {
  let data: any

  try {
    data = await sql`SELECT * FROM technology`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: tech } = data

  return tech
}
