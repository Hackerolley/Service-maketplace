import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryById/:id", getCategoryById);

/**
 * Admin Routes
 */
router.post(
  "/createCategory",
  authMiddleware,
  authorizeRoles("admin"),
  createCategory
);

router.put(
  "/updateCategory/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateCategory
);

router.delete(
  "/deleteCategory/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteCategory
);

export default router;