# CS-465 Security Notes

## Authentication and Protected Routes

The enhanced application moves JWT validation into reusable middleware and applies that middleware to protected administrative routes. This improves consistency because route protection is handled through a shared middleware function instead of being duplicated directly in route definitions.

The enhanced application also protects audit log query endpoints. Audit history can contain sensitive operational information, so those endpoints should not be exposed publicly.

## Input Validation

The enhanced application adds reusable trip validation middleware and strengthens the Mongoose trip schema. This reduces the chance of malformed trip records reaching the database and supports more predictable API behavior.

## Database Traceability

The enhanced application adds audit logging for trip create, update, and delete operations. Audit records include the action performed, trip code, document ID, actor when available, before-and-after values, and request metadata.

## Environment Variables

The `.env.example` file documents expected local development settings without exposing real secrets. Real JWT secrets, database credentials, and production configuration values should not be committed to source control.

## Dependency Notes

During local testing, npm audit reported vulnerabilities in the inherited class project dependency tree. I did not run `npm audit fix --force` during final project preparation because forced dependency upgrades can introduce breaking changes in older MEAN-stack coursework projects. For a production system, the next step would be to review each vulnerable package, update dependencies in a controlled branch, run regression tests, and verify that the Angular, Express, MongoDB, and JWT functionality still work correctly.
