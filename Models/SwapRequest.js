import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offerSkill: String,
  wantSkill: String,
  status: { type: String, enum: ["pending", "accepted", "rejected", "cancelled"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("SwapRequest", swapSchema);
