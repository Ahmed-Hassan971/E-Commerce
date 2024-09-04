import joi from "joi";


export const addAddressValidation = {
    body:joi.object({
        address : joi.string().required(),
        city : joi.string().required(),
        phone : joi.string()
    })
}