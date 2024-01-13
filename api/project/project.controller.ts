import { loggerService } from "../../services/logger.service";
import { Request, Response } from "express";
import { projectsQuery } from "./project.service";

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await projectsQuery({});
    res.json(projects);
  } catch (err) {
    loggerService.error("Failed to get products projects", err);
    res.status(500).send({ err: "Failed to get products projects" });
  }
}

export async function getProjectById(req: Request, res: Response) {
  const filterBy = {
    id: req.params.id,
  };
  try {
    const projects = await projectsQuery(filterBy);
    res.json(projects);
  } catch (err) {
    loggerService.error("Failed to get products projects", err);
    res.status(500).send({ err: "Failed to get products projects" });
  }
}
