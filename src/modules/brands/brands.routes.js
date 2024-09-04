

import { Router } from "express";
import { UpdateBrand, addBrand, deleteBrand, deleteBrandImg, getAllBrands, getBrand } from "./controller/brands.controller.js";
import { validate } from "../../middleware/validate.js";
import { addBrandValidation } from "./controller/brands.validation.js";
import { uploadImage, uploadValidation } from "../../multer/multer.cloud.js";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";


const brandRouter = Router();

/**Get All Categories && Add */
brandRouter.route("/")
    .get(getAllBrands)
    .post(uploadImage(uploadValidation.image).single("logo"), validate(addBrandValidation), addBrand)

/**Update && delete brand */
brandRouter.route("/:id")
    .get(getBrand)
    .put(authMiddleware, allowedTo("admin"), UpdateBrand)
    .delete(authMiddleware, allowedTo("admin"), deleteBrand)

brandRouter.delete(":/id/image", authMiddleware, allowedTo("admin"), deleteBrandImg)

export default brandRouter;

