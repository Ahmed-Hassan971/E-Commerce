
import joi from "joi"
import { idValidation } from "../../product/controller/product.validation.js"


export const addToCartValidation = {
    body: joi.object({
        product: joi.string().hex().length(24).required(),
        qty: joi.number().positive()
    })
}

export const updateCartQtyValidation = {
    body: joi.object({
        product: joi.string().hex().length(24).required(),
        qty: joi.number().positive().required()
    })
}

export const removeCartItemValidation = {
    params: joi.object({
        id: idValidation
    })
}