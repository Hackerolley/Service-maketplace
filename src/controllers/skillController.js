import Skill from "../models/skillModel.js";

/**
 * CREATE SKILL (Admin or system / provider suggestion)
 */
export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;

    // check if skill exists
    const existingSkill = await Skill.findOne({ name });

    if (existingSkill) {
      return res.status(400).json({
        message: "Skill already exists",
      });
    }

    const skill = await Skill.create({
      name,
      status: "pending", // providers create pending skills
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating skill",
      error: error.message,
    });
  }
};

/**
 * GET ALL APPROVED SKILLS
 */
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ status: "approved" });

    res.status(200).json({
      count: skills.length,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching skills",
      error: error.message,
    });
  }
};

/**
 * APPROVE SKILL (ADMIN ONLY)
 */
export const approveSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.status = "approved";
    await skill.save();

    res.status(200).json({
      message: "Skill approved successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error approving skill",
      error: error.message,
    });
  }
};

/**
 * DELETE SKILL (ADMIN)
 */
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.deleteOne();

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting skill",
      error: error.message,
    });
  }
};

