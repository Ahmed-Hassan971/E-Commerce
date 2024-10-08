import { productModel } from "../../../../DB/models/product.model.js";
import reviewModel from "../../../../DB/models/review.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";
import {
  deleteData,
  getData,
  getDocById,
} from "../../../../util/model.util.js";

export const getAllReviews = catchError(getData(reviewModel));

export const getReview = catchError(getDocById(reviewModel));

export const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id.toHexString();
  const { product } = req.body;
  const existProduct = await productModel.findById(product);
  if (!existProduct) {
    return next(new AppError("In-Valid product id", 404));
  }
  const isReview = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReview) {
    return next(new AppError("You Created review before", 409));
  }
  const result = await reviewModel.create(req.body);
  return res.json({ message: "success", result });
});

export const UpdateReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id.toHexString();
  const { id } = req.params;
  const review = await reviewModel.findById(id);

  if (!review) {
    return next(new AppError("Not Found", 404));
  }

  if (review.user !== req.user._id) {
    return next(new AppError("Not Authorized", 401));
  }
  review.content = req.body.content || review.content;
  review.rating = req.body.rating || review.content;
  await review.save();
  res.status(201).json({ message: "success", review });
});

export const deleteReview = catchError(deleteData(reviewModel));
