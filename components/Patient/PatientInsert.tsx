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
    INSERT INTO Patient (pid, fname, lname, dob, reasonforcheckingin, insurance_no, address, sexual_orientation, doctorid)
    VALUES 
        (${values.pid}, ${values.fname}, ${values.lname}, ${values.dob}, ${values.reasonforcheckingin}, ${values.insurance_no}, ${values.address}, ${values.sexual_orientation}, ${values.doctorid});` 

    data = await sql`SELECT * FROM patient;`
    
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: res } = data

  return res
}
