# Engineering Decision Log

## 1. Why did you choose this technology stack?

I chose the **MERN stack (MongoDB, Express.js, React, and Node.js)** because I am already familiar with it, which allowed me to focus on building the required features instead of learning new technologies. Using JavaScript across both the frontend and backend also made development faster, code reuse easier, and debugging more efficient.

---

## 2. Why did you choose this database?

I chose **MongoDB** because I have previous experience using it in MERN stack applications. It integrates seamlessly with Node.js through Mongoose, provides flexible document-based storage, and enabled faster development without requiring a rigid schema.

---

## 3. Why did you structure your application this way?

I separated the project into **client** and **server** applications to keep the frontend and backend responsibilities independent. On the frontend, I organized the code into components, pages, layouts, services, and assets for better reusability and maintainability. On the backend, I followed a structured approach using config, controllers, middleware, models, and routes so each layer has a single responsibility, making the application easier to debug and extend.

---

## 4. What trade-offs did you make due to time constraints?

Due to the limited time, I focused on delivering the core functionality first. I postponed production-level features such as authentication, unit testing, Docker containerization, and CI/CD. My priority was to ensure the application was functional, maintainable, and met all the core requirements.

---

## 5. What would you improve if you had one more week?

With one more week, I would add authentication, unit and integration testing, Docker support, a CI/CD pipeline, rate limiting, monitoring, structured logging, improved validation, better error handling, and more comprehensive documentation. I would also improve the UI/UX and optimize the application for scalability and performance.

---

## 6. What was the most difficult technical challenge you faced?

The most difficult challenge was debugging a **CORS issue** caused by the Express 5 setup. The frontend was unable to communicate with the backend correctly, so I had to investigate the CORS configuration, allowed origins, and middleware order. Resolving this issue improved my understanding of backend configuration and frontend-backend integration.

---

## 7. Which AI tools did you use?

- Bolt (for initial UI design)
- Claude (for implementation discussions and code review)
- ChatGPT (for debugging, explanations, and documentation)

---

## 8. Share one instance where AI helped you.

AI helped me troubleshoot the Express 5 CORS issue by suggesting possible causes related to the CORS configuration, middleware order, and allowed origins. After reviewing the suggestions, I verified the solution myself and successfully resolved the issue.

---

## 9. Share one instance where you disagreed with AI and why.

One instance where I disagreed with AI was when it generated excessive boilerplate code for relatively simple features. I chose a cleaner and simpler implementation because it better matched the scope of the assignment and made the code easier to understand and maintain.

---

## 10. What would break first if this application suddenly had 100,000 users?

The backend API and database would likely become the first bottlenecks due to the increased number of concurrent requests. Without caching, load balancing, query optimization, and horizontal scaling, response times would increase and the server could become overloaded.

---

## 11. What is one thing in this assignment that you would improve, change, or challenge?

I would provide slightly more time for the assignment. The scope includes frontend, backend, database, deployment, documentation, and production-readiness considerations. A longer timeline would allow candidates to implement additional production-ready features such as testing, authentication, Docker, CI/CD, and monitoring while maintaining high code quality.