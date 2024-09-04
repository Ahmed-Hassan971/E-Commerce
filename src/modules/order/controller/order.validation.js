import joi from "joi"


export const createOrderValidation = {
    body: joi.object({
        // cart: joi.string().hex().length(24).required(),
        paymentMethode: joi.string().valid("cash", "credit"),
        address: joi.object({
            city: joi.string().required(),
            street: joi.string().required()
        }),
    })
}
