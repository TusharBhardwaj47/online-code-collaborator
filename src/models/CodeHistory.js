import mongoose from "mongoose";

const codeHistorySchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    savedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CodeHistory = mongoose.model("CodeHistory", codeHistorySchema);
