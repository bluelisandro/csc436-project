import { sql } from '@vercel/postgres'

export default async function Delete(id) {
  let data: any

  try {
    alert("Deleted entry taskID = " + id)
    await sql`DELETE FROM employeetasks WHERE taskid = ${id};`
    data = await sql`SELECT * FROM employeetasks;`
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: tasks } = data

  return tasks
}
