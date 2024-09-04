import { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      require: [true, "Review Comment Required"],
    },
    product: { type: Types.ObjectId, require: true, ref: "product" },
    user: { type: Types.ObjectId, require: true, ref: "user" },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name email");
});

const reviewModel = model("review", reviewSchema);

export default reviewModel;
