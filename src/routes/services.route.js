import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getMyServices,
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/", authMiddleware, createService);
router.get("/", getAllServices);
router.get("/me", authMiddleware, getMyServices);
router.get("/:id", getServiceById);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;