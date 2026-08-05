# CS-465 Travlr Smoke Test Results

## Test Date

August 2026

## Backend Startup

Result: PASS

The backend started successfully with npm start.

MongoDB connection result:

Mongoose connected to mongodb://127.0.0.1/travlr

## Public API Test

Endpoint tested:

GET /api/trips

Result: PASS

The endpoint returned HTTP 200 and displayed existing trip records.

## Protected Audit Endpoint Test

Endpoint tested without JWT:

GET /api/audit/trips

Result: PASS

The endpoint returned HTTP 401 with the message:

Authorization header required

This confirms that the audit route is protected and does not expose audit history without authentication.

## Full CRUD and Audit Test

The following protected workflow was tested:

1. Register test user
2. Receive JWT token
3. Create test trip
4. Update test trip
5. Query audit logs before delete
6. Delete test trip
7. Query audit logs after delete

Result: PASS

Observed API results:

- POST /api/register returned HTTP 200.
- POST /api/trips returned HTTP 201.
- PUT /api/trips/:tripCode returned HTTP 200.
- GET /api/audit/trips/:tripCode returned HTTP 200.
- DELETE /api/trips/:tripCode returned HTTP 200.
- GET /api/audit/trips/:tripCode returned HTTP 200.

## Audit Actions Verified

The audit log query returned all expected actions:

- CREATE
- UPDATE
- DELETE

## Final Result

PASS: CS-465 create, update, delete, and audit retrieval smoke test passed.

## Notes

This smoke test supports the CS 499 software design and database enhancements. It verifies that the enhanced backend starts successfully, protected routes require authentication, trip CRUD operations work, and database audit records are created and retrievable.
