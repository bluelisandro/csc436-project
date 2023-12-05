import { sql } from '@vercel/postgres'

export default async function PatientDelete(id: string) {
  try {
    await sql`DELETE FROM patient WHERE pid = ${id}`;
  } catch (e: any) {
    if (e) {
      throw e
    }
  }

}
