import { Schema, Types, model } from "mongoose";


const subCategorySchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    category: {
        type: Types.ObjectId,
        required: true,
        ref:"category"
    },
    slug:{
        type:String
    },
    logo: {
        type: String
    }
}, { timestamps: true })

subCategorySchema.post("init", (ele) => {
    ele.logo && (ele.logo = process.env.BASE_URL + 'subcategory/' + ele.logo)
})
const subCategoryModel = model('subCategory', subCategorySchema)

export default subCategoryModel