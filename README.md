# CS 465 Full Stack Development I – Travlr Getaways

## Project Overview

This project is a full stack web application for Travlr Getaways, a travel booking website. The application includes a public customer-facing website where users can view travel packages and an administrative single-page application (SPA) where authorized users can manage trip data. Throughout the course, the project evolved from a static website into a full stack MEAN application using MongoDB, Express, Angular, and Node.js. The final version includes API-based data access, CRUD functionality, and secure admin login authentication using JSON web tokens.

## Architecture

### Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

In this project, I used two different frontend approaches. The customer-facing side used Express with Handlebars templates to render HTML pages from the server. This approach works well for public pages because the server prepares the page and sends complete HTML to the browser. The travel page originally used static HTML, but it was later refactored to load trip data dynamically from the backend API.

The admin side used Angular as a single-page application. Unlike the Express-rendered pages, the Angular SPA runs mostly in the browser and communicates with the backend through API requests. This made the admin side more interactive because trip cards, add forms, edit forms, and delete actions could update data without rebuilding the entire server-rendered website. JavaScript and TypeScript were used throughout the project to handle routing, API calls, form input, and authentication logic.

The main difference is that Express HTML is server-rendered, while the Angular SPA is client-rendered. Express was useful for the public website, while Angular was better suited for the admin dashboard because it allowed reusable components and a more application-like user experience.

### Why did the backend use a NoSQL MongoDB database?

The backend used MongoDB because the trip data fits naturally into a document-based structure. Each trip contains related fields such as code, name, length, start date, resort, price, image, and description. MongoDB stores this type of data as flexible JSON-like documents, which made it easier to work with from the Node.js and Express backend.

MongoDB was also a good fit because the application exchanges data between the frontend and backend in JSON format. Since MongoDB documents are similar to JSON objects, it reduced the amount of conversion needed between the database, API, and Angular frontend. This made the full stack workflow more direct and easier to maintain.

## Functionality

### How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

JavaScript is a programming language, while JSON is a data format. JSON looks similar to JavaScript object syntax, but it is only used to represent and transfer data. JSON does not contain functions, logic, or executable code. It is mainly a structured text format that can be easily sent between systems.

In this project, JSON connected the frontend and backend. The Express API returned trip data as JSON, and the Angular admin SPA used that JSON to display trip cards and populate forms. When adding or updating trips, Angular sent JSON data back to the Express API, which then stored the information in MongoDB. JSON acted as the common language between the Angular frontend, Express backend, and MongoDB database.

### Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

One major refactor was moving the travel page from static HTML content to dynamic data loaded from a JSON file and later from MongoDB through an API. This improved functionality because trip information no longer had to be manually duplicated in HTML. The data could be stored once and reused by both the public website and the admin SPA.

Another refactor was separating the backend into an API structure with routes, controllers, and models. This made the code easier to organize and expand. Instead of placing all logic in one file, API route handling, database models, and controller methods were separated by responsibility.

The Angular admin side also used reusable UI components. The trip card component allowed each trip to be displayed consistently without duplicating the same HTML repeatedly. The trip listing component managed the list of trips, while the add and edit components handled form-based CRUD operations. Reusable components make the application easier to maintain because updates can be made in one place and reflected everywhere that component is used.

## Testing

### Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

In a full stack application, endpoints are the API URLs that the frontend uses to communicate with the backend. Each endpoint supports specific HTTP methods. For example, `GET /api/trips` retrieves all trips, `GET /api/trips/:tripCode` retrieves one trip, `POST /api/trips` adds a new trip, `PUT /api/trips/:tripCode` updates an existing trip, and `DELETE /api/trips/:tripCode` removes a trip.

Testing these endpoints is important because each method performs a different action. I tested retrieval methods to confirm that trip data was returned correctly. I also tested add, update, and delete methods to confirm that the Angular admin SPA could send data to the Express API and that MongoDB stored the changes correctly.

Security added another layer of testing. In the final version, administrative actions required authentication with a JSON web token. This meant that protected endpoints had to be tested both without a token and with a valid token. A request without a token should be rejected, while a request with a valid token should be allowed. This helped confirm that public users could still view trip data, but only authenticated admin users could create, update, or delete trips.

## Reflection

### How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course helped me better understand how the different parts of a full stack application work together. Before building the project, it was easy to think of the frontend, backend, database, and API as separate pieces. By the end of the course, I had a better understanding of how those pieces connect into one working application.

I developed experience with Express, Node.js, MongoDB, Angular, REST APIs, and authentication. I also gained more practice troubleshooting issues across multiple layers of an application. For example, a problem might come from the Angular frontend, the API route, the controller logic, the database model, or the security token. Learning how to trace those problems made me more comfortable working through real-world development issues.

This course also helped me build skills that are useful for my professional goals in technology and security. Understanding how APIs, authentication, tokens, and frontend/backend communication work is valuable for both software development and cybersecurity. The final project gave me a portfolio-ready example of a full stack application with public features, admin CRUD functionality, and secure login authentication.

## Repository

GitHub Repository: https://github.com/R4nd0m6uy/CS-465
