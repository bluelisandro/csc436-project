import React from 'react';
import { sql } from '@vercel/postgres';
import { useState, useEffect } from 'react';

type Patient = {
    pid: number;
    fname: string;
    lname: string;
    // dob: Date;
  };


export async function Query(): Promise<Patient[]> {
  try {
    const result = await sql`SELECT pid, fname, lname FROM patient`;
    const patientData: Patient[] = result.rows.map((row) => {
      return {
        pid: row.pid,
        fname: row.fname,
        lname: row.lname
        // dob: new Date(row.dob.year, row.dob.month - 1, row.dob.day),
      };
    });
    return patientData;
    // setData(patientData);
  } catch (e: any) {
    throw e;
  }
};

