import userModel from "../../../../DB/models/user.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendEmail from "../../../../util/email/email.js";
import { emailTemp } from "../../../../util/email/emailTemp.js";

export const signup = catchError(async (req, res, next) => {
    const existUser = await userModel.findOne({ email: req.body.email })
    if (existUser) {
        return next(new AppError("Email Already Exist PLease Login", 403))
    } else {
        req.body.password = bcrypt.hashSync(req.body.password, +process.env.HASH_SALT_ROUND)
        const result = await userModel.create(req.body)
        const token = jwt.sign({ id: result._id, name: result.name, email: result.email, isActive: result.confirmEmail, role: result.role }, process.env.TOKEN_SIGNTURE)
        const verifyToken = jwt.sign({ id: result._id }, process.env.TOKEN_SIGNTURE)
        const link = `${req.protocol}://${req.headers.host}/api/v1/auth/verifyemail/${verifyToken}`
        await sendEmail({
            to: result.email,
            subject: "Verify Your Email",
            html: emailTemp(link)
        })
        return res.json({ message: "success", token })
    }
})

export const verifyemail = catchError(async (req, res, next) => {
    const { verifyToken } = req.params;
    const { id } = jwt.verify(verifyToken, process.env.TOKEN_SIGNTURE)
    if (!id) {
        return next(new AppError("Not Found", 404))
    }
    const result = await userModel.findById(id)
    if (!result) {
        return next(new AppError("Not Found", 404))
    }
    if (result.confirmEmail) {
        return next(new AppError("Email Already Verified", 402))
    }
    if (result) {
        result.confirmEmail = true;
        await result.save()
        res.json({ message: "success", param: "Please log in to activate your Account" })
    } else {
        return next(new AppError("Not Found", 404))
    }

})

export const signin = catchError(async (req, res, next) => {
    const { email, password } = req.body
    const result = await userModel.findOne({ email })
    if (!result) {
        return next(new AppError("Email Nor Register, please register as firest"))
    }
    const match = bcrypt.compareSync(password, result.password)
    if (!match) {
        return next(new AppError("In-Correct Password", 403))
    }
    if (!result.confirmEmail) {
        return next(new AppError("Your Email is not Verified, please verify your emial"))
    }
    const token = jwt.sign({ id: result._id, name: result.name, email: result.email, role: result.role, isActive: result.confirmEmail }, process.env.TOKEN_SIGNTURE)

    res.json({ message: "success", token })
})

