import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getMyServices,
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/createservice", authMiddleware, authorizeRoles("provider"), createService);
router.get("/getallservices", getAllServices);
router.get("/getmyservices", authMiddleware, authorizeRoles("customer"), getMyServices);
router.get("/getservice/:id", getServiceById);
router.put("/updateservice/:id", authMiddleware, authorizeRoles("provider"), updateService);
router.delete("/deleteservice/:id", authMiddleware , authorizeRoles("provider"), deleteService);
export default router;