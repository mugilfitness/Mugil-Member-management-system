const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    branchName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    branchCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    branchType: {
      type: String,
      enum: [
        "Head Branch",
        "Branch",
      ],
      default: "Branch",
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "Tamil Nadu",
    },

    pincode: {
      type: String,
      default: "",
    },

    openingTime: {
      type: String,
      default: "",
    },

    closingTime: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    totalMembers: {
      type: Number,
      default: 0,
    },

    activeMembers: {
      type: Number,
      default: 0,
    },

    expiredMembers: {
      type: Number,
      default: 0,
    },

    monthlyRevenue: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
      ],
      default: "Active",
    },

    color: {
      type: String,
      default: "#4d3df7",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    newMembersThisMonth: {
      type: Number,
      default: 0,
    },

    membershipPlans: {
      type: Number,
      default: 0,
    },

    establishedDate: {
      type: Date,
    },

    mapLocation: {
      type: String,
      default: "",
    },

    // Audit
    createdBy: {
      type: String,
      default: "Admin",
    },

    updatedBy: {
      type: String,
      default: "Admin",
    },


  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Branch",
    branchSchema
  );