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
router.post("/createrequest", authMiddleware, createRequest);

/**
 * GET CUSTOMER REQUESTS
 */
router.get("/getmyrequests", authMiddleware, getMyRequests);

/**
 * PROVIDER REQUESTS
 */
router.get("/getproviderrequests", authMiddleware, getProviderRequests);

/**
 * PROVIDER UPDATE STATUS
 */
router.put("/updaterequeststatus/:id", authMiddleware, updateRequestStatus);

export default router;