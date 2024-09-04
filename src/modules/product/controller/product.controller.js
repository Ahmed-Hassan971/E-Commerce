import slugify from "slugify"
import { deleteData, deleteImg, getData, getDocById } from "../../../../util/model.util.js"
import { catchError } from "../../../../util/catchError.js"
import { AppError } from "../../../../util/AppError.js"
import { productModel } from "../../../../DB/models/product.model.js"
import cloudinary from "../../../multer/cloudinary.js"



export const getAllProducts = catchError(getData(productModel))

export const addProduct = catchError(async (req, res, next) => {
    const { name } = req.body
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/product/productsImage" })
    req.body.logo = { public_id, secure_url }
    const slug = slugify(name, "-")
    req.body.slug = slug
    const result = await productModel.create(req.body)
    res.status(201).json({ message: "success", result })
})

export const addProductImage = catchError(async (req, res, next) => {
    const { id } = req.params
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/product/productsImage" })

    const prodduct = await productModel.findByIdAndUpdate(id, {
        logo: { public_id, secure_url }
    }, { new: true })
    if (!prodduct) {
        next(new AppError("not found", 404))
    }
    res.status(201).json({ message: "success", prodduct })

})
/** please blash  tensa tzbatha*/
export const UpdateProduct = catchError(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) {
        req.body.slug = slugify(req.body.name, "-")
    }
    const result = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
        return next(new AppError("Not Found", 404))
    }
    res.status(201).json({ message: "success", result })
})

export const getProduct = catchError(getDocById(productModel))

export const deleteProduct = catchError(deleteData(productModel))

export const deleteProductImage = catchError(deleteImg(productModel))