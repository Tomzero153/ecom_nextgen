import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    qty: {
      type: Number,
      required: true,
    },
    sellqty: {
      type: Number,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
      required: false,
      default: null,
    },
    img3: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: {},
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
