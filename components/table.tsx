import { sql } from '@vercel/postgres'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import { seed } from '@/lib/seed'

export default async function Table() {
  let data: any
  let startTime = Date.now()

  // try {
  data = await sql`SELECT pid, fname, lname FROM patient`
  // } catch (e: any) {
  //   if (e) {
  //     throw e
  //   }
  // }

  const { rows: patients } = data
  // const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Patients</h2>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <div
                key={patient.pid}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center space-x-4">
                  <div className="space-y-1">
                    <tr>
                    <td className="font-medium leading-none">{patient.pid}</td>
                    <td className="text-sm text-gray-500">{patient.fname}</td>
                    <td className="text-sm text-gray-500">{patient.lname}</td>
                    </tr>
                  </div>
                </div>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}