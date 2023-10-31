-- Get all patients that do not have a doctor using an outer join.
-- 
-- This query uses a left outer join to return all rows from the patient table, even if there are no matching rows in the doctor table.
-- The LEFT JOIN keyword ensures that all rows from the left table (patients) are returned, even if there are no matching rows in the right table (doctors).
FROM patient
LEFT JOIN doctor ON patient.doctorid = doctor.did
WHERE doctor.did IS NULL;