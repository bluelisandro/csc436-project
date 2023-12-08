import { sql } from '@vercel/postgres'

export default async function Insert(values: any) {
  let data: any

  try {
    // INSERT INTO Patient (pid, fname, lname, dob, reasonforcheckingin, insurance_no, address, sexual_orientation, doctorid)
    // VALUES 
    // (11, 'David', 'Lee', '1979-07-08', 'General checkup', 888888888, '567 Cedar St', 'male', 9);

    // alert("Deleted entry PID = " + id)

    // insert all values using the values object
    await sql`
    UPDATE Patient
        SET insurance_no = ${values.insurance_no}
        WHERE pid = ${values.pid};`
    data = await sql`SELECT * FROM patient;`
  } catch (e: any) {
    if (e) {
      alert("Error: Incorrect format inputted")
      throw e
    }
  }

  const { rows: res } = data

  return res
}
