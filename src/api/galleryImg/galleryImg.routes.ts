// REFERENCE CODE
import { Router } from "express";
// const {
//   requireAuth,
//   requireAdmin,
// } = require("../../middlewares/requireAuth.middleware");

import { getGalleryImgs } from "./galleryImg.controller";

export const router = Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getGalleryImgs);
// router.get("/:id", getProductById);

// router.post("/", requireAuth, addStation);
// // router.post('/', addStation)
// router.put("/:id", requireAuth, updateStation);
// // router.put('/:id', updateStation)
// router.delete("/:id", requireAuth, removeStation);
// // router.delete('/:id', removeStation)
// router.delete("/:id", requireAuth, removeStation);

// router.post('/:id/msg', requireAuth, addStationMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeStationMsg)
