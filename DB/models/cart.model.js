import mongoose, { Schema, Types, model } from "mongoose";



const cartSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    products: [
        {
            product: { type: Types.ObjectId, ref: 'product', required: true },
            qty: { type: Number, default: 1 },
            price: Number,
        },
    ],
    totalAmount: { type: Number, default: 0 },
    totalAmountAfterDisc: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }
})

cartSchema.method('addToCart', async function (prodId) {
    const allProducts = [...this.products];
    const index = allProducts.findIndex((prod) => prod.product === prodId);
    if (index === -1) {
        this.products.push({ product: prodId });
        await this.save();
        return
    }
    allProducts[index].qty++;
    this.products = allProducts;
    await this.save();
});

cartSchema.pre([/^find/, "save"], function () {
    this.populate("products.product", "name price")
})

export const cartModel = model('cart', cartSchema);

// for useing custom methods
// const cart = new cartModel();
// cart.addToCart();

