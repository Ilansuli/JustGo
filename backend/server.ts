import express from "express";
import { loggerService } from "./services/logger.service";
import axios from "axios";
import cors from "cors";
import path from "path";

const app = express();
import { createServer } from "http";
const http = createServer(app);

// Express App Config
app.use(express.json());

// In summary, this code checks the NODE_ENV variable to determine whether the application is in a production environment or not.
// In production, it serves static files from the "public" directory,
// while in non-production environments, it configures CORS to handle cross-origin requests from specific origins.

if (process.env.NODE_ENV === "production") {
  loggerService.error("in production mode");
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  app.use(
    cors({
      origin: ["192.168.31.232:3000", "http://localhost:3000"],
      credentials: true,
    })
  );
}

import { router as exerciseRoutes } from "./api/exercise/exercise.routes";
import { log } from "./middlewares/logger.middleware";

// routes
app.use("/api/exercise", exerciseRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/station/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
  loggerService.info(`Server is running on http://localhost:${port}`);
});

app.get("/api/keepAlive", async (req, res) => {
  try {
    res.send("keepAlive");
  } catch (err) {
    loggerService.error("Failed to get test", err);
    res.status(500).send({ err: "Failed to get test" });
  }
});

// setInterval(async () => {
//   try {
//     const response = await axios.get(`https://justgo.com/api/keepAlive`);
//     console.log("Request to / successful:", response.data);
//   } catch (error) {
//     console.error("Error making request to /:", error.message);
//   }
// }, 13 * 60 * 1000);
