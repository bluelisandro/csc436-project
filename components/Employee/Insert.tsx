import { sql } from '@vercel/postgres'

export default async function Insert(values: any) {
    let data: any

    try {
        
        type Employee = {
                eid: number; // Employee ID
                fname: string; // First name
                lname: string; // Last name
                salary: number; // Annual salary
                address: string,
                etype: string
        };

        // insert all values using the values object
        await sql`
        INSERT INTO Employee (eid, fname, lname, salary, address, etype)
        VALUES 
                (${values.eid}, ${values.fname}, ${values.lname}, ${values.salary}, ${values.address}, ${values.etype});` 

        data = await sql`SELECT * FROM Employee;`
        
    } catch (e: any) {
        if (e) {
            throw e
        }
    }

    const { rows: res } = data

    return res
}