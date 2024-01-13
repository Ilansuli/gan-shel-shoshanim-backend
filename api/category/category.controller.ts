import { loggerService } from "../../services/logger.service";
import { Request, Response } from "express";
import { categoriesQuery } from "./category.service";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesQuery({});
    res.json(categories);
  } catch (err) {
    loggerService.error("Failed to get products categories", err);
    res.status(500).send({ err: "Failed to get products categories" });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const filterBy = {
    id: req.params.id,
  };
  try {
    const categories = await categoriesQuery(filterBy);
    res.json(categories);
  } catch (err) {
    loggerService.error("Failed to get products categories", err);
    res.status(500).send({ err: "Failed to get products categories" });
  }
}
