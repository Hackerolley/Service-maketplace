import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createReview, getServiceReviews, deleteReview,  } from "../controllers/reviewController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * CREATE REVIEW
 */
router.post("/createReview", authMiddleware, createReview);

/**
 * GET REVIEWS FOR A SERVICE
 */
router.get("/getAServiceReviews/:Id", getServiceReviews);

/**
 * DELETE REVIEW
 */
router.delete("/deleteAReview/:id", authMiddleware, authorizeRoles(["admin", "user"]), deleteReview);

export default router;