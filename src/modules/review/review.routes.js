

import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";
import { UpdateReview, addReview, deleteReview, getAllReviews, getReview } from "./controller/review.controller.js";
import { addReviewValidation, updateReviewValidation } from "./controller/review.validation.js";


const reviewRouter = Router();

/**Get All Categories && Add */
reviewRouter.route("/")
    .get(getAllReviews)
    .post(authMiddleware, validate(addReviewValidation), allowedTo("user"), addReview)

/**Update && delete brand */
reviewRouter.route("/:id")
    .get(getReview)
    .put(authMiddleware, allowedTo("user"), validate(updateReviewValidation) , UpdateReview)
    .delete(authMiddleware, allowedTo("admin", "user"), deleteReview)


export default reviewRouter;

