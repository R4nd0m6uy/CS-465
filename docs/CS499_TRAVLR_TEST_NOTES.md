# CS-465 Travlr Test Notes

## Static Syntax Checks

Commands used:

node -c app_api/controllers/trips.js
node -c app_api/controllers/auditLogs.js
node -c app_api/models/auditLog.js
node -c app_api/models/travlr.js
node -c app_api/routes/index.js

Expected result:

- All listed backend files pass Node syntax checks.

## Software Design Test Areas

The following areas should be reviewed before final ePortfolio submission:

- JWT middleware is imported and used by protected routes.
- Trip validation middleware is applied to create and update routes.
- Angular route guard protects add-trip and edit-trip routes.
- Trip schema validation supports required fields, uniqueness, indexing, and timestamps.

## Database Test Areas

The following database-focused behavior should be reviewed:

- Creating a trip writes a CREATE audit record.
- Updating a trip writes an UPDATE audit record with before-and-after values.
- Deleting a trip writes a DELETE audit record.
- Duplicate trip codes return a clearer duplicate-key response.
- Validation errors return structured validation details.
- Protected audit routes return recent audit history only for authenticated requests.

## Final ePortfolio Notes

This artifact is used for both the software design and database enhancement categories. The final ePortfolio should separate those two enhancement explanations clearly, even though they come from the same original CS-465 project.
