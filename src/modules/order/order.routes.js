import { Router } from "express";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";
import { validate } from "../../middleware/validate.js";
import {
  checkOutError,
  checkOutSession,
  checkOutSuccess,
  createOrder,
  getAllorders,
  getSpecOrder,
  removeorder,
} from "./controller/order.controller.js";
import { createOrderValidation } from "./controller/order.validation.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(authMiddleware, getSpecOrder)
  .delete(authMiddleware, removeorder);

orderRouter
  .route("/:id")
  .post(validate(createOrderValidation), authMiddleware, createOrder);

orderRouter.get("/all", authMiddleware, allowedTo("admin", "user"), getAllorders);
orderRouter.get("/checkOut/:id", authMiddleware, checkOutSession)
orderRouter.get("/checkOutSuccess", checkOutSuccess)
orderRouter.get("/checkOutError", checkOutError)
export default orderRouter;
