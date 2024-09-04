import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    slug: { type: String, require: true },
    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 4,
      maxLength: 300,
    },
    stock: { type: Number, default: 0, min: 0 },
    price: { type: Number, require: [true, "Product Price Require"], min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    avgRate: {
      type: Number,
      min: [1, "rating averge must be greater than 1"],
      max: [1, "rating averge must be less than 5"],
      default: 1,
    },
    soldItems: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, min: 0, default: 0 },
    paymentPrice: { type: Number, min: 0, default: 0 },
    colors: { type: [String], require: true },
    sizes: { type: [String] },
    images: [{ public_id: String, secure_url: String }],
    logo: { public_id: String, secure_url: String },
    category: {
      type: Types.ObjectId,
      require: [true, "Product Category Require"],
      ref: "category",
    },
    subCategory: {
      type: Types.ObjectId,
      require: [true, "Product SubCategory Require"],
      ref: "subCategory",
    },
    brand: {
      type: Types.ObjectId,
      require: [true, "Product Brand Require"],
      ref: "brand",
    },
  }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
},
  { timestamps: true }
);

productSchema.post("init", (ele) => {
  ele.logo && (ele.logo = process.env.BASE_URL + "subcategory/" + ele.logo);
});
productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
  // justOne: true,
});


productSchema.pre("findOne", function () {
  this.populate([{
    path: "reviews"
  }, {
    path: "brand"
  },
  {
    path: "category"
  }])
})
export const productModel = model("product", productSchema);
