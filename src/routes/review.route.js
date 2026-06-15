import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createReview,
  getServiceReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * CREATE REVIEW
 */
router.post("/", authMiddleware, createReview);

/**
 * GET REVIEWS FOR A SERVICE
 */
router.get("/service/:serviceId", getServiceReviews);

/**
 * DELETE REVIEW
 */
router.delete("/:id", authMiddleware, deleteReview);

export default router;