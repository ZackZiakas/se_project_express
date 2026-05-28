# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. The API supports user registration, login, authorization, clothing item management, likes, and profile updates.

## Deployment

Backend API: https://api.wtwr-class-demo.jumpingcrab.com/

Frontend Website: https://wtwr-class-demo.jumpingcrab.com/

## Repository Links

Frontend GitHub Repository: https://github.com/ZackZiakas/se_project_react
Backend GitHub Repository: https://github.com/ZackZiakas/se_project_express

## Project Pitch Video

Project 15 Video Pitch: https://www.loom.com/share/d61d985fd7b846c0ba6c0a1936c51977

## Running the Project

`npm run start` — launches the server on `localhost:3001`

`npm run dev` — launches the server on `localhost:3001` with hot reload

`npm run lint` — runs ESLint

## Technologies & Techniques

- **Node.js + Express** — REST API server and routing
- **MongoDB + Mongoose** — database, schemas/models, validation, and queries
- **JWT** — user authorization
- **bcryptjs** — password hashing
- **Celebrate/Joi** — request validation
- **validator** — URL validation for `avatar` and `imageUrl`
- **Winston/express-winston** — request and error logging
- **PM2** — process manager for deployment
- **Nginx** — reverse proxy and static frontend serving
- **ESLint (airbnb-base) + Prettier** — code style and linting
- **Nodemon** — hot reload during development

## Environment Variables

Create a `.env` file in the project root with:

```env
JWT_SECRET=your-secret-key
```
