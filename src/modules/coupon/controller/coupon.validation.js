import joi from "joi"


export const addCouponValidation = {
    body: joi.object({
        code: joi.string().required().length(6),
        discount: joi.number().positive().required(),
        expires: joi.date().min(Date.now()).required()
    })
}
export const updateCouponValidation = {
    body: joi.object({
        code: joi.string().length(6),
        discount: joi.number().positive(),
        expires: joi.date().min(Date.now()),
        users : joi.array().items(joi.string().hex().length(24).required())
    })
}