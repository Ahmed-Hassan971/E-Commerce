import { Schema, model } from "mongoose";


const categorySchema = new Schema({
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

categorySchema.post("init", (ele) => {
    ele.logo && (ele.logo = process.env.BASE_URL + 'subcategory/' + ele.logo)
})
const categoryModel = model('category', categorySchema)

export default categoryModel