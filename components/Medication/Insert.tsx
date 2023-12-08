import { sql } from '@vercel/postgres'

export default async function Insert(values: any) {
  let data: any

  try {
    type Medication = {
        mid: number;
        mname: string;
        medtype: string;
        price: number; 
        amount: number,
        company: string,
        expiration_date: string
    };

    // insert all values using the values object
    await sql`
    INSERT INTO Medication (mid, mname, medtype, price, amount, company, expiration_date)
    VALUES 
        (${values.mid}, ${values.mname}, ${values.medtype}, ${values.price}, ${values.amount}, ${values.company}, ${values.expiration_date});`

    data = await sql`SELECT * FROM medication;`
    
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

  const { rows: res } = data

  return res
}
