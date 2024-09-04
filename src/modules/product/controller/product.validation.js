import joi from "joi"

export const idValidation = joi.string().hex().length(24).required()

export const addProductValidation = {
    body:joi.object({
        name: joi.string().min(5).max(30).required(),
        description: joi.string().min(4).max(300).required(),
        stock: joi.number().integer().min(0),
        price: joi.number().min(0).required(),
        discount: joi.number().min(0),
        avgRate: joi.number().min(1).max(5),
        soldItems: joi.number().min(0),
        totalAmount: joi.number().min(0),
        paymentPrice: joi.number().min(0),
        colors: joi.array().items(joi.string().required()),
        sizes: joi.array().items(joi.string().required()),
        images: joi.array().items(joi.string().required()),
        logo: joi.string(),
        category: joi.string().hex().length(24).required(),
        subCategory: joi.string().hex().length(24).required(),
        brand: joi.string().hex().length(24).required(),
    })
}

export const updateProductValidation = {
    body:joi.object({
        name: joi.string().min(5).max(30),
        description: joi.string().min(4).max(300),
        stock: joi.number().integer().min(0),
        price: joi.number().min(0),
        discount: joi.number().min(0),
        avgRate: joi.number().min(1).max(5),
        soldItems: joi.number().min(0),
        totalAmount: joi.number().min(0),
        paymentPrice: joi.number().min(0),
        colors: joi.array().items(joi.string().required()),
        sizes: joi.array().items(joi.string().required()),
        images: joi.array().items(joi.string().required()),
        logo: joi.string(),
        category: joi.string().hex().length(24),
        subCategory: joi.string().hex().length(24),
        brand: joi.string().hex().length(24),

    }),
    params: joi.object({
        id: idValidation
    })
}

export const deleteProductValidation = {
    params: joi.object({
        id: idValidation
    })
}