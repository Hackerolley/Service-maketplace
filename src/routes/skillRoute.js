import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  createSkill,
  getAllSkills,
  approveSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

/**
 * CREATE SKILL (provider or admin suggestion)
 */
router.post("/createSkill", authMiddleware, createSkill);

/**
 * GET ALL APPROVED SKILLS (public)
 */
router.get("/approvedSkills", getAllSkills);

/**
 * APPROVE SKILL (ADMIN ONLY)
 */
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("admin"),
  approveSkill
);

/**
 * DELETE SKILL (ADMIN ONLY)
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteSkill
);

export default router;