import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        },
        cartData: {
            type: Object,
          },
    },
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("Address", addressSchema);
export default User;