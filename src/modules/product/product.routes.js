import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import {
  addProductValidation,
  deleteProductValidation,
  updateProductValidation,
} from "./controller/product.validation.js";
import {
  UpdateProduct,
  addProduct,
  addProductImage,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProduct,
} from "./controller/product.controller.js";
import { uploadValidation, uploadImage } from "../../multer/multer.cloud.js";

const productRouter = Router();

/**Get All Categories && Add */
productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    uploadImage(uploadValidation.image).single("logo"),
    validate(addProductValidation),
    addProduct
  );

/**Update && delete Product */
productRouter
  .route("/:id")
  .get(getProduct)
  .put(validate(updateProductValidation), UpdateProduct)
  .delete(validate(deleteProductValidation), deleteProduct);
productRouter
  .route("/:id/image")
  .post(uploadImage(uploadValidation.image).single("logo"), addProductImage)
  .delete(deleteProductImage);

export default productRouter;
