

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { deleteData, getData, getDocById } from "../../../../util/model.util.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";
import userModel from "../../../../DB/models/user.model.js";

// 7-get all user 
export const getALlUsers = catchError(getData(userModel))

// export const getALlUsers = getData(usersModel)
export const getUserById = catchError(getDocById(userModel))

//3-update user
export const updateUser = catchError((async (req, res, next) => {
    const { id } = req.params
    const { _id: userId } = req.user
    if (id !== userId.toHexString()) {
        return next(new AppError("Not Authorized", 401))
    }
    if (req.body.newPassword) {
        const match = bcrypt.compareSync(req.body.oldPassword, req.user.password)
        if (!match) {
            return next(new AppError("In-Correct old Password", 403))
        }
        if (req.body.newPassword === req.body.rePassword) {
            const hashPasword = bcrypt.hashSync(req.body.newPassword, +process.env.HASH_SALT_ROUND)
            req.body.passwordChangedAt = Date.now()
            req.body.password = hashPasword
        } else {
            return next(new AppError("password and rePassword not Match"))
        }
    }
    if (req.body.email) {
        if (req.body.email == req.user.email) {
            delete req.body.email
        } else {
            const existEmail = await userModel.findOne({ email: req.body.email })
            if (existEmail) {
                return next(new AppError("Email Already Exist PLease Login", 403))
            }
        }
    }
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isActive: user.confirmEmail }, process.env.TOKEN_SIGNTURE)
    return res.json({ message: "success", token })
})
)
//4-delete user
export const deleteUser = deleteData(userModel, "user")

export const changePasword = catchError(async (req, res, next) => {
    const { id } = req.params
    const { _id: userId } = req.user
    if (id !== userId.toHexString()) {
        return next(new AppError("Not Authorized", 401))
    }

    const match = bcrypt.compareSync(req.body.oldPassword, req.user.password)
    if (!match) {
        return next(new AppError("In-Correct old Password", 403))
    }
    if (req.body.newPassword === req.body.rePassword) {
        const hashPasword = bcrypt.hashSync(req.body.newPassword, +process.env.HASH_SALT_ROUND)
        req.body.password = hashPasword
    } else {
        return next(new AppError("password and rePassword not Match"))
    }
    req.body.passwordChangedAt = Date.now()
    
    // console.log(req.body);
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isActive: user.confirmEmail }, process.env.TOKEN_SIGNTURE)
    return res.json({ message: "success", token, user })
})










