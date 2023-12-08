import { sql } from '@vercel/postgres'

export default async function Insert(values: any) {
  let data: any

  try {
    type Technology = {
        tname: string;
        datelastused: string;
        serial_number: string;
        usagedescription: string;
        manufacturer: string;
    };

    // insert all values using the values object
    await sql`
    INSERT INTO Technology (tname, datelastused, serial_number, usagedescription, manufacturer)
    VALUES 
        (${values.tname}, ${values.datelastused}, ${values.serial_number}, ${values.usagedescription}, ${values.manufacturer});`

    data = await sql`SELECT * FROM technology;`
    
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: res } = data

  return res
}
