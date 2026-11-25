import mongoose from "mongoose";

const DocumentSegmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    isClue: { type: Boolean, default: false },
    clueLabel: { type: String, default: "" },
  },
  { _id: false }
);

const DocumentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    docType: { type: String, default: "FILE" },
    meta: { type: String, default: "" },
    content: { type: String, required: true },
    isClue: { type: Boolean, default: true },
    segments: { type: [DocumentSegmentSchema], default: [] },
  },
  { _id: false }
);

const HintSchema = new mongoose.Schema(
  {
    tier: { type: Number, required: true },
    label: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const CaseSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    chapter: { type: String, required: true },
    chapterNumber: { type: Number, required: true, min: 1, max: 4 },
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Dễ", "Trung bình", "Khó", "Boss"],
      required: true,
    },
    timeLimit: { type: Number, default: null },
    speaker: {
      type: String,
      enum: ["SYSTEM", "KHOI", "VY", "KHOA", "EREBUS"],
      required: true,
    },
    dialogue: { type: String, required: true },
    victoryNote: { type: String, default: "" },
    visualType: { type: String, required: true },
    briefing: { type: String, required: true },
    answer: {
      type: String,
      required: true,
      select: false,
    },
    inputPlaceholder: { type: String, default: "Nhập mật mã..." },
    documents: { type: [DocumentSchema], default: [] },
    hints: { type: [HintSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Case = mongoose.models.Case || mongoose.model("Case", CaseSchema);

export default Case;
