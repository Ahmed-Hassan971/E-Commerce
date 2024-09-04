
import jwt from "jsonwebtoken";
import { catchError } from "../../util/catchError.js";
import { AppError } from "../../util/AppError.js";
import userModel from "../../DB/models/user.model.js";


export const authMiddleware = catchError(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new AppError("authorization is required", 403))
    }
    const decoded = jwt.verify(authorization, process.env.TOKEN_SIGNTURE)

    if (!decoded?.id) {
        return next(new AppError("Invalid Token payload", 401))
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new AppError("Email not found", 404))
    }
    if (user.passwordChangedAt) {
        const passwordChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (passwordChangedAt > decoded.iat) {
            return next(new AppError("Invalid Token payload", 401))
        }
    }
    if(!user.confirmEmail){
        return next(new AppError("Email not Verified", 403))
    }
    req.user = user
    return next()
})


export const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError("Not Authorized", 401))
        }
        next()
    })  
}