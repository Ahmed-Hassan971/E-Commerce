import { Router } from "express";
import { UpdateCategory, addCategory, deleteCategory, deleteCategoryImg, getAllCategories, getCategory } from "./controller/category.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./controller/category.validation.js";
import { uploadSingleFile } from "../../multer/fileUpload.js";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";


const categoryRouter = Router();

/**Get All Categories && Add Category */
categoryRouter.route("/")
    .get(getAllCategories)
    .post(uploadSingleFile("image", "category"), validate(addCategoryValidation), addCategory)




/**Update Category && Delete Category*/
categoryRouter.route("/:id")
    .get(getCategory)
    .put(validate(updateCategoryValidation), UpdateCategory)
    .delete(validate(deleteCategoryValidation), authMiddleware, allowedTo("admin"), deleteCategory)
categoryRouter.delete("/:id/image", deleteCategoryImg)
export default categoryRouter;

