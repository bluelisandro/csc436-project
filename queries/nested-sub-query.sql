-- Nested sub-query
-- Get all patients that have taken the Flu Vaccine and are seeing a Cardiologist doctor
SELECT *
FROM patient
WHERE pid IN (
    SELECT patient.pid
    FROM patient
    INNER JOIN medicationroom ON patient.pid = medicationroom.medicationid
    INNER JOIN medication ON medicationroom.medicationid = medication.mid
    WHERE medication.mname = 'Flu Vaccine'
)
AND doctorid IN (
    SELECT doctor.did
    FROM doctor
    WHERE doctor.dtype = 'Cardiologist'
);
