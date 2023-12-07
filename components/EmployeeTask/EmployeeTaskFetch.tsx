import { sql } from '@vercel/postgres'

export default async function Fetch() {
  let data: any

  try {
    data = await sql`SELECT * FROM employeetasks`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: tasks } = data

  return tasks
}
