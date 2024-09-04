import { productModel } from "../../../../DB/models/product.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";


export const addToWishlist = catchError(async (req, res, next) => {
    const { _id } = req.user
    const { product } = req.body
    const existProduct = await productModel.findById(product)
    if (!existProduct) {
        throw new AppError("In-Valid Product ID", 404)
    }
    
    const wishlist = await userModel.findByIdAndUpdate(_id, { $addToSet: { wishList: product } }, { new: true })
    if (!wishlist) {
        throw new AppError("In-Valid User ID", 404)
    }
    res.json({ message: "success", wishlist: wishlist.wishList })
})

export const getWishlistDetails = catchError(async (req, res, next) => {
    const { _id } = req.user
    const wishlist = await userModel.findById(_id).select("wishlist")
    res.json({ message: "success", wishlist })
})

export const removeFromWishlist = catchError(async (req, res, next) => {
    const { _id } = req.user
    const { product } = req.body

    const wishlist = await userModel.findByIdAndUpdate(_id, { $pull: { wishList: product } }, { new: true })
    if (!wishlist) {
        throw new AppError("In-Valid User ID", 404)
    }
    res.json({ message: "success", wishlist: wishlist.wishList })
})