import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["device", "accessory", "plan", "bundle"],
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "JPY" },
    description: String,
    stock: Number,
    features: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
