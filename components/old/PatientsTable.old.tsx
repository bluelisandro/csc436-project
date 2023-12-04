"use client"
import { useState, useEffect } from 'react';
import { Query } from './Query';

const PatientsTable = () => {
    type Patient = {
        pid: number;
        fname: string;
        lname: string;
        // dob: Date;
      };

    const [data, setData] = useState<Patient[]>([]);

    useEffect(() => {
      (async () => {
        const patientData = await Query();
        setData(patientData);
      })();
    }, []);
  
    if (!data) {
      return <div>Loading...</div>;
    }

  return (
    <table>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          {/* <th>Date Of Birth</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((patient) => (
          <tr key={patient.pid}>
            <td>{patient.pid}</td>
            <td>{patient.fname}</td>
            <td>{patient.lname}</td>
            {/* <td>{patient.dob}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientsTable;
