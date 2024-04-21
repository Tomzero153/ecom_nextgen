import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
          },
      
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false,
            
        },
        state: {
            type: String,
            required: false,
            
        }
        ,
        postal: {
            type: Number,
            required: false,
            
        }
        ,
        country: {
            type: String,
            required: false,
            
        }
        ,
        phone: {
            type: String,
            required: false,
        }
        ,
       
    },
    { timestamps: true }
)

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;