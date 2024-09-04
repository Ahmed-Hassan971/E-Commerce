import couponModel from "../../../../DB/models/cuopon.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";

export const createCoupon = catchError(async (req, res, next) => {
  const existcode = await couponModel.findOne({ code: req.body.code });
  if (existcode) {
    throw new AppError("Code Already Exist", 403);
  }
  const coupon = await couponModel.create(req.body);
  res.json({ message: "success", coupon });
});

export const getAllCoupons = catchError(async (req, res, next) => {
  const coupon = await couponModel.find();
  res.json({ message: "success", coupon });
});

export const getSpecCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await couponModel.findById(id);
  if (!coupon) {
    throw new AppError("In-Valid Coupon ID", 404);
  }
  res.json({ message: "success", coupon });
});

export const removeCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await couponModel.findByIdAndDelete(id);
  if (!coupon) {
    throw new AppError("In-Valid Coupon ID", 404);
  }
  res.json({ message: "success", coupon });
});

export const updateCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  const existCoupon = await couponModel.findById(id);
  if (!existCoupon) throw new AppError("In-Valid Coupon ID", 404);

  if (req.body.code) {
    if (req.body.code === existCoupon.code)
      throw new AppError("can not update coupon with the same name", 403);

    const existCouponCode = await couponModel.findOne({ code: req.body.code });
    if (existCouponCode) throw new AppError("Code Already Exist", 402);
  }
  if (req.body.discount) {
    existCoupon.discount = req.body.discount;
  }
  if (req.body.expires) {
    existCoupon.expires = req.body.expires;
  }
  await existCoupon.save();
  res.status(201).json({ message: "success", result: existCoupon });
});
