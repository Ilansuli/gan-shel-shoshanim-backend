import { Router } from "express";

import { getProjects, getProjectById } from "./project.controller";

export const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
