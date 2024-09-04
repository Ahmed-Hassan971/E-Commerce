
import { Router } from "express";
import { UpdateSubCategory, addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory } from "./controller/subCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubCategoryValidation, updateSubCategoryValidation } from "./controller/subCategory.validation.js";
import { deleteCategoryValidation } from "../category/controller/category.validation.js";


const subCategoryRouter = Router();

/**Get All Categories */
subCategoryRouter.get("/", getAllSubCategories)


/**Add Category */
subCategoryRouter.post("/", validate(addSubCategoryValidation), addSubCategory)

/**Update Category && Delete */
subCategoryRouter.route("/:id").get(getSubCategory)
    .put(validate(updateSubCategoryValidation), UpdateSubCategory)
    .delete(validate(deleteCategoryValidation), deleteSubCategory)

export default subCategoryRouter;

