import { Router } from "express";

import { getCategories, getCategoryById } from "./category.controller";

export const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
