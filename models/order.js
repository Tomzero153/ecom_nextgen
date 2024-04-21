import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {

    id: {
        type: Number,
        unique: true,
        required: true,
      },
    username: {
      type: String,
      required: true,
    },
    address: {
        type: Object,
      },
    cartData: {
      type: Object,
    },
    totalAmount: {
        type: Number,
        required: true,
      },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
