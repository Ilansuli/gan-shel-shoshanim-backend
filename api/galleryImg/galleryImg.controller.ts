import { loggerService } from "../../services/logger.service";
import { Request, Response } from "express";
import { galleryImgsQuery } from "./galleryImg.service";

export async function getGalleryImgs(req: Request, res: Response) {
  try {
    const galleryImgs = await galleryImgsQuery({
      pageParam: +req.query.pageParam || undefined,
      limit: +req.query.limit || undefined,
      categoryId: req.query.categoryId || "",
      projectId: req.query.projectId || "",
    });
    res.send(galleryImgs);
  } catch (err) {
    loggerService.error("Failed to get galleryImgs", err);
    res.status(500).send({ err: "Failed to get galleryImgs" });
  }
}

// export async function getProductById(req: Request, res: Response) {
//   try {
//     const stationId = req.params.id;
//     const station = await getById(stationId);
//     res.json(station);
//   } catch (err) {
//     loggerService.error("Failed to get station", err);
//     res.status(500).send({ err: "Failed to get station" });
//   }
// }
