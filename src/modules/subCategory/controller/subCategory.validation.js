import joi from "joi"

const idValidation = joi.string().hex().length(24).required()

export const addSubCategoryValidation = {
    body: joi.object({
        name: joi.string().min(3).required(),
        category: joi.string().hex().length(24)
    })
}
export const updateSubCategoryValidation = {
    body: joi.object({
        name: joi.string().min(3),
    }),
    params: joi.object({
        id: idValidation
    })
}

export const deleteSubCategoryValidation = {
    params: joi.object({
        id: idValidation
    })
}