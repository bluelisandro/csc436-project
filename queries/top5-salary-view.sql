-- Get the highest 5 employee salaries
-- 
-- This query first orders all employees by their salary in descending order. Then, it limits the results to the top 5 employees.
-- Finally, it creates a view called highest_salaries that contains the results of the query.
CREATE VIEW highest_salaries AS
SELECT eid, fname, lname, salary
FROM employee
ORDER BY salary DESC
LIMIT 5;