import { Router } from "express";
import { changePasword, deleteUser, getALlUsers, getUserById, updateUser } from "./controller/users.controller.js";
import { authMiddleware } from "../../middleware/authentication.js";
import { validate } from "../../middleware/validate.js";
import { changePaswordValidation, deleteUserValidation, updateValidation } from "./controller/users.validation.js";


const usersRouter = Router()


usersRouter.get("/", getALlUsers)
usersRouter.get("/:id", getUserById)
usersRouter.patch("/changePasword/:id", authMiddleware, validate(changePaswordValidation), changePasword)
usersRouter.put("/:id", authMiddleware, validate(updateValidation), updateUser)
usersRouter.delete("/:id", authMiddleware, validate(deleteUserValidation), deleteUser)



export default usersRouter;