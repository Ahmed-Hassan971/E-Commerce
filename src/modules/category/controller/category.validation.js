import joi from "joi"

const idValidation = joi.string().hex().length(24).required()

export const addCategoryValidation = {
    body: joi.object({
        name: joi.string().min(3).required(),
        description: joi.string().required().min(4).max(50)
    })
}

export const updateCategoryValidation = {
    body: joi.object({
        name: joi.string().min(3),
        description: joi.string().min(4).max(50),
    }),
    params: joi.object({
        id: idValidation
    })
}

export const deleteCategoryValidation = {
    params: joi.object({
        id: idValidation
    })
}
