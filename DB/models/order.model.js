import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Types.ObjectId, ref : "user"
    },
    cartItems:  [{
        product: {type : Types.ObjectId, ref: "product",},
        qty: Number,
        price: Number,
    }],
    totalPrice: Number,
    discount :Number,
    totalPriceAfterDisc: Number,
    paymentMethode : {
        type: String, enums : ["cash", "credit"], default : "cash"
    },
    address:{
        city: String, street : String
    },
    isPaid: {
        type: Boolean, default: false
    },
    paidAt: Date, 
    isDelivered: Boolean,
    deliveredAt: Date
}, {timestamps: true})

const orderModel = model("order", orderSchema);
export default orderModel;

