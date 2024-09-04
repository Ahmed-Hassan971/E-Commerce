import userModel from "../../../../DB/models/user.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";

export const addAddress = catchError(async (req, res, next) => {
  const { user } = req;
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json({ message: "success", addresses: user.addresses });
});

export const getAddresses = catchError(async (req, res, next) => {
  res.status(201).json({ message: "success", addresses: req.user.addresses });
});

export const removeAddress = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const address = await userModel.findByIdAndUpdate(
    user._id,
    {
      $pull: {
        addresses: { _id: id },
      },
    },
    { new: true }
  );
  res.status(201).json({ message: "success", addresses: address.addresses });
});

export const updateAddress = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  //   req.body._id = id;
  try {
    const update = await userModel.findOneAndUpdate(
      { "addresses._id": id, _id: user._id },
      {
        $set: {
          "addresses.$.address": req.body.address,
          "addresses.$.city": req.body.city,
          "addresses.$.phone": req.body.phone,
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "success", addresses: update.addresses });
  } catch (error) {
    throw new AppError("In-Valid authorization", 403);
  }
});
