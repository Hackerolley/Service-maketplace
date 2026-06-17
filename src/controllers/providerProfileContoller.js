import ProviderProfile from "../models/providerProfileModel.js";

/**
 * Create Provider Profile
 */
export const createProviderProfile = async (req, res) => {
  try {
    const existingProfile = await ProviderProfile.findOne({
      user: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Provider profile already exists",
      });
    }

    const profile = await ProviderProfile.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get My Profile
 */
export const getMyProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.user._id,
    })
      .populate("user", "name email phone")
      .populate("skills.skill", "name");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Get Provider Profile By User Id
 */
export const getProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.params.userId,
    })
      .populate("user", "name email phone")
      .populate("skills.skill", "name");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Update Profile
 */
export const updateProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name email phone")
      .populate("skills.skill", "name");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Delete Profile
 */
export const deleteProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOneAndDelete({
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};