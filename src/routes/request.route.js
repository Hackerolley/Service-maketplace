import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createRequest,
  getMyRequests,
  getProviderRequests,
  updateRequestStatus,
} from "../controllers/requestController.js";

const router = express.Router();

/**
 * CUSTOMER SEND REQUEST
 */
router.post("/", authMiddleware, createRequest);

/**
 * CUSTOMER REQUESTS
 */
router.get("/my", authMiddleware, getMyRequests);

/**
 * PROVIDER REQUESTS
 */
router.get("/provider", authMiddleware, getProviderRequests);

/**
 * PROVIDER UPDATE STATUS
 */
router.put("/:id", authMiddleware, updateRequestStatus);

export default router;