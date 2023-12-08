import { sql } from "@vercel/postgres"

export default async function Insert(values: any) {
  let data: any

  try {
    // insert all values using the values object
    await sql`
    UPDATE Employee
    SET salary = ${values.salary}
    WHERE eid = ${values.eid};`

    data = await sql`SELECT * FROM employee;`
  } catch (e: any) {
    if (e) {
      alert("Error: Incorrect format inputted")
      throw e
    }
  }

  const { rows: res } = data

  return res
}
