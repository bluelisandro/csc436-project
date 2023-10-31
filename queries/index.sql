-- Get all medication rooms that contain Ibuprofen
-- 
-- This query will use the index on the medicationid column in the medicationroom table to quickly find all medication rooms that contain the Flu Vaccine. 
-- Without the index, the database would have to scan the entire medicationroom table to find the matching rows.
SELECT *
FROM medicationroom
WHERE medicationid IN (
    SELECT mid
    FROM medication
    WHERE mname = 'Ibuprofen'
)