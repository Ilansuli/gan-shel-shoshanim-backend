import express from "express";
import { loggerService } from "./services/logger.service";

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
      origin: ["http://192.168.31.232:3000", "http://localhost:3000"],
      credentials: true,
    })
  );
}

import { router as galleryImgsRoutes } from "./api/galleryImg/galleryImg.routes";
import { router as categoryRoutes } from "./api/category/category.routes";
import { router as projectRoutes } from "./api/project/project.routes";
import { insertProject } from "./services/project.service";
import { log } from "./middlewares/logger.middleware";
import { simulateUser } from "./services/simulate.user.service";

// routes
app.use("/api/galleryImgs", galleryImgsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/projects", projectRoutes);

setInterval(simulateUser, 50 * 60 * 100);
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
