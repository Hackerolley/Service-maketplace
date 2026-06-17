import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "beginner",
    },
  },
    ],

    experience: {
      type: Number, // years of experience
      default: 0,
    },

    portfolio: [
      {
        title: String,
        description: String,
        image: [String],
        link: String,
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ProviderProfile", providerProfileSchema);