import { Schema, Types, model } from "mongoose";


const couponSchema = new Schema({
    code:  {
        type: String, trim: true, require: true,  uniqe: true
    },
    discount: {
        type: Number, min: 0, require: true
    },
    expires: {
        type: Date,require: true
    },
    users: [{ 
        type: Types.ObjectId, ref: "user" 
    }]
}, { timestamps: true })

const couponModel = model("coupon", couponSchema)

export default couponModel;