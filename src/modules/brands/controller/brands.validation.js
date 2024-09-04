import joi from "joi"

const idValidation = joi.string().hex().length(24).required()

export const addBrandValidation = {
    body: joi.object({
        name: joi.string().min(3).required(),
        description: joi.string().required().min(4).max(50)
    }).required()
}

export const updateBrandValidation = {
    body: joi.object({
        name: joi.string().min(3),
        description: joi.string().min(4).max(50),
    }),
    params:
        joi.object({
            id: idValidation
        })
}

export const deleteBrandValidation = {
    params: joi.object({
        id: idValidation
    })
}
