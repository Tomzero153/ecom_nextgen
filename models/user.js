import mongoose, { Schema } from "mongoose";

const addressSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);


const userSchema = new Schema(
    {
        username: {
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
        address :[addressSchema],
        cartData: {
            type: Object,
          },
    },
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;