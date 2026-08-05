# CS 499 Software Design and Engineering Enhancement Summary

## Artifact

CS-465 Travlr Getaways full-stack application.

## Enhancement Category

Software Design and Engineering.

## Enhancements Completed

The enhanced version improves the original Travlr application by adding:

- Reusable JWT authentication middleware
- Reusable trip validation middleware
- Stronger Mongoose trip schema validation
- Angular route guard protection for administrative trip routes

## Software Design Improvements

The original route file contained authentication logic directly inside the routing layer. The enhanced version moves JWT verification into reusable middleware, which improves separation of concerns and makes route protection easier to apply consistently.

The enhanced version also adds trip validation middleware so create and update requests are checked before they reach the controller and database layers. This makes the API easier to maintain and reduces repeated validation logic.

## Security Improvements

The route guard and authentication middleware help protect administrative functionality. The validation middleware and schema validation reduce the risk of malformed or unexpected data reaching the database.

## Course Outcome Connection

This enhancement supports software engineering, secure design, and professional communication outcomes by improving maintainability, modularity, validation, and protected access.
