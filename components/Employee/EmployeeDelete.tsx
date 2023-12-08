import { sql } from '@vercel/postgres'

export default async function Delete(id) {
  let data: any

  try {
    alert("Deleted entry EID = " + id)
    await sql`DELETE FROM employee WHERE eid = 10;`
    data = await sql`SELECT * FROM employee;`
  } catch (e: any) {
    if (e) {
      alert("Error: ")
      throw e
    }
  }

  const { rows: employees } = data

  return employees
}
