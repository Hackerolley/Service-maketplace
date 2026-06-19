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
        title: {
          type : String,
          trim : true, 
          required : true
        },

        description: {
          type : String,
          maxlength : 10000,
          required : true
        },
          

        images: [{
          type : String
        }],

        link: {
          type : String,
          trim : true
        },

      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifieldDate : Date,
    verifiedBy : {
      type : mongoose.Schema.Type.ObjectId,
      ref : User
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ProviderProfile", providerProfileSchema);