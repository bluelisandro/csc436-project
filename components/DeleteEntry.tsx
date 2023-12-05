"use client";
import { useState, useEffect } from 'react';
import PatientDelete from '@/components/Patient/PatientDelete';

interface DeleteEntryProps {
  id: string;
}

const DeleteEntry: React.FC<DeleteEntryProps> = ({ id }) => {
  const [currentTable] = useState<string>(''); // Define the type for currentTable

  useEffect(() => {
    async function deleteEntry() {
      if (currentTable === 'PatientTable') {
        await PatientDelete(id);
      }
    }

    deleteEntry();
    
    // Add an alert that outputs the id
    alert(`ID to delete: ${id}`);

  }, [id, currentTable]); // Include id and currentTable in the dependency array

  return (
    <div>
      <h1>Delete Entry Success!</h1>
    </div>
  );
};

export default DeleteEntry;
