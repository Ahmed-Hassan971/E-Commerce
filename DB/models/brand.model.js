

import { Schema, model } from "mongoose";


const brandSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String
    },
    logo: { public_id: String, secure_url: String },
}, { timestamps: true })

brandSchema.post("init", (ele) => {
    ele.logo && (ele.logo = process.env.BASE_URL + 'brand/' + ele.logo)
})
const brandModel = model('brand', brandSchema)

export default brandModel