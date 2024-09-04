import slugify from "slugify"
import subCategoryModel from "../../../../DB/models/subCategory.model.js"
import { deleteData, getData, getDocById } from "../../../../util/model.util.js"
import { catchError } from "../../../../util/catchError.js"
import { AppError } from "../../../../util/AppError.js"
import categoryModel from "../../../../DB/models/category.model.js"



export const getAllSubCategories = catchError(getData(subCategoryModel))

export const getSubCategory = catchError(getDocById(subCategoryModel))

export const addSubCategory = catchError(async (req, res, next) => {
    const { name, category } = req.body
    const existName = await subCategoryModel.findOne({ name })
    if (existName) {
        return next(new AppError("Name Already exist", 409))
    }
    const existCategory = await categoryModel.findById(category)
    if (!existCategory) {
        return next(new AppError("Category not found", 404))
    }
    const slug = slugify(name, "-")
    const result = await subCategoryModel.create({ name, category, slug })
    res.json({ message: "success", result })
})

export const UpdateSubCategory = catchError(async (req, res, next) => {
    const { name, category } = req.body
    const { id } = req.params;
    const slug = slugify(name, "-")
    const updates = { name, category, slug }
    const existName = await subCategoryModel.findOne({ name })
    if (existName && !existName._id === id) {
        next(new AppError("Name Already exist", 409))
    }
    const existCategory = await categoryModel.findById(category)
    if (!existCategory) {
        return next(new AppError("Category not found", 404))
    }
    const result = await subCategoryModel.findByIdAndUpdate(id, updates, { new: true })
    if (!result) {
        return next(new AppError("Not Found", 404))
    }
    res.json({ message: "success", result })
})

export const deleteSubCategory = catchError(deleteData(subCategoryModel))