import { Router } from "express";
import { addAddress, getAddresses, removeAddress, updateAddress } from "./controller/addresses.controller.js";
import { validate } from "../../middleware/validate.js";
import { addAddressValidation } from "./controller/addresses.validation.js";
import { authMiddleware } from "../../middleware/authentication.js";

const addressRouter = Router();

addressRouter.post(
  "/",
  validate(addAddressValidation),
  authMiddleware,
  addAddress
);
addressRouter.get("/", authMiddleware, getAddresses)
addressRouter.delete("/:id",authMiddleware, removeAddress )
addressRouter.patch("/:id",authMiddleware, updateAddress )

export default addressRouter;
