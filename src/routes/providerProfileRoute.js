import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  createProviderProfile,
  getMyProfile,
  getProviderProfile,
  updateProviderProfile,
  deleteProviderProfile,
} from "../controllers/providerProfile.controller.js";

const router = express.Router();

/**
 * Create Profile
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("provider"),
  createProviderProfile
);

/**
 * Get Logged-in Provider Profile
 */
router.get(
  "/me",
  authMiddleware,
  authorizeRoles("provider"),
  getMyProfile
);

/**
 * Get Provider Profile By User Id
 */
router.get("/:userId", getProviderProfile);

/**
 * Update Profile
 */
router.put(
  "/",
  authMiddleware,
  authorizeRoles("provider"),
  updateProviderProfile
);

/**
 * Delete Profile
 */
router.delete(
  "/",
  authMiddleware,
  authorizeRoles("provider"),
  deleteProviderProfile
);

export default router;