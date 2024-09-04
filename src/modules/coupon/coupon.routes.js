import { Router } from "express";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";
import {createCoupon,getAllCoupons,getSpecCoupon,removeCoupon,updateCoupon,} from "./controller/coupon.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCouponValidation, updateCouponValidation } from "./controller/coupon.validation.js";

const couponRouter = Router();

couponRouter
  .route("/")
  .post(
    authMiddleware,
    allowedTo("admin"),
    validate(addCouponValidation),
    createCoupon
  )
  .get(authMiddleware, allowedTo("admin"), getAllCoupons);

couponRouter
  .route("/:id")
    .get(authMiddleware, allowedTo("admin"), getSpecCoupon)
    .delete(authMiddleware, allowedTo("admin"), removeCoupon)
    .patch(authMiddleware, allowedTo("admin"), validate(updateCouponValidation), updateCoupon);

export default couponRouter;
