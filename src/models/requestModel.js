import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    }
    ],

    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "in progress", "completed" ,"delivered", "rejected"],
      default: "pending",
    },

    scheduledDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Request", requestSchema);