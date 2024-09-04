import slugify from "slugify"
import categoryModel from "../../../../DB/models/category.model.js"
import { deleteData, deleteImg, getData, getDocById } from "../../../../util/model.util.js"
import { catchError } from "../../../../util/catchError.js"
import { AppError } from "../../../../util/AppError.js"
import cloudinary from "../../../multer/cloudinary.js"

export const getAllCategories = catchError(getData(categoryModel, 'http://localhost:3000/category'))

export const getCategory = catchError(getDocById(categoryModel))

export const addCategory = catchError(async (req, res, next) => {
    const { name, description } = req.body

    const slug = slugify(name, "-")
    const existName = await categoryModel.findOne({ name })
    if (existName) {
        return next(new AppError("Name Already exist", 409))
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/product/productsImage" })
    req.body.logo = { public_id, secure_url }
    const result = await categoryModel.create(req.body)
    res.json({ message: "success", result })
})

export const UpdateCategory = catchError(async (req, res, next) => {
    const { name, description } = req.body
    const { id } = req.params;
    const slug = slugify(name, "-")
    const updates = { name, description, slug }
    const existName = await categoryModel.findOne({ name })
    if (existName && existName.name != name) {
        return next(new AppError("Name Already exist", 409))
    }
    const result = await categoryModel.findByIdAndUpdate(id, updates, { new: true })
    if (!result) {
        return next(new AppError("Not Found", 404))
    }
    res.json({ message: "success", result })
})

export const deleteCategory = catchError(deleteData(categoryModel))

export const deleteCategoryImg = catchError(deleteImg(categoryModel))