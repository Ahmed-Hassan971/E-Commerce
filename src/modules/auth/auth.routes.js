import { Router } from "express";
import { signin, signup, verifyemail } from "./controller/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { signinValidation, signupValidation } from "./controller/auth.validation.js";


const authRouter = Router()

authRouter.post("/signup", validate(signupValidation), signup)
authRouter.post("/signin", validate(signinValidation), signin)
authRouter.get("/verifyemail/:verifyToken", verifyemail)

export default authRouter