
import joi from "joi"

const idValidation = joi.string().hex().length(24).required()

export const updateValidation = {
    body: joi.object({
        name: joi.string().pattern(new RegExp(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/)),
        email: joi.string().email(),
        oldPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/), `It must contain at least one uppercase letter.
        It must contain at least one lowercase letter.
        It must contain at least one digit.
        It must contain at least one special character.
        It must be at least 9 characters long.`),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/), `It must contain at least one uppercase letter.
        It must contain at least one lowercase letter.
        It must contain at least one digit.
        It must contain at least one special character.
        It must be at least 9 characters long.`),
        rePassword: joi.string().valid(joi.ref("newPassword")),
        age: joi.number().integer().min(8).max(90),
        phone: joi.string().pattern(/^(\+2)?(01)[0125][0-9]{8}$/),
        gender: joi.string().valid('Male', 'Female', 'Not Selected').insensitive(),
        addresses : joi.array()
    }),
    params: joi.object({
        id: idValidation
    })
}

export const deleteUserValidation = {
    params: joi.object({
        id:idValidation
    })
}

export const changePaswordValidation = {
    params: joi.object({
        id:idValidation
    }),
    body: joi.object({
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/), `It must contain at least one uppercase letter.
            It must contain at least one lowercase letter.
            It must contain at least one digit.
            It must contain at least one special character.
            It must be at least 9 characters long.`).required(),
        rePassword: joi.string().valid(joi.ref("password")).required(),
    })
}
