import { cartModel } from "../../../../DB/models/cart.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import { productModel } from "../../../../DB/models/product.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { AppError } from "../../../../util/AppError.js";
import { catchError } from "../../../../util/catchError.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);

export const createOrder = catchError(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.id);
  console.log(cart);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const order = new orderModel({
    user: req.user._id,
    cartItems: cart.products,
    totalPrice: cart.totalAmount,
    totalPriceAfterDisc: cart.totalAmountAfterDisc || cart.totalAmount,
    address: req.body.address,
  });
  await order.save();

  const options = cart.products.map((el) => ({
    updateOne: {
      filter: { _id: el.product },
      update: { $inc: { stock: -el.qty, soldItems: +el.qty } },
    },
  }));

  await productModel.bulkWrite(options);
  await cartModel.findByIdAndDelete(req.params.id);

  res.status(201).json({ message: "success", order });
});

export const getAllorders = catchError(async (req, res, next) => {
  const order = await orderModel.find();
  res.json({ message: "success", order });
});

export const getSpecOrder = catchError(async (req, res, next) => {
  const id = req.user._id;
  const order = await orderModel.find({ user: id });
  if (!order) {
    throw new AppError("In-Valid order ID", 404);
  }
  res.json({ message: "success", order });
});

export const removeorder = catchError(async (req, res, next) => {
  const order = await orderModel.findOneAndDelete({ user: req.user._id });
  if (!order) {
    throw new AppError("In-Valid order ID", 404);
  }
  res.json({ message: "success", order });
});

export const updateorder = catchError(async (req, res, next) => {
  const { id } = req.params;
  const existorder = await orderModel.findById(id);
  if (!existorder) throw new AppError("In-Valid order ID", 404);

  if (req.body.code) {
    if (req.body.code === existorder.code)
      throw new AppError("can not update order with the same name", 403);

    const existorderCode = await orderModel.findOne({ code: req.body.code });
    if (existorderCode) throw new AppError("Code Already Exist", 402);
  }
  if (req.body.discount) {
    existorder.discount = req.body.discount;
  }
  if (req.body.expires) {
    existorder.expires = req.body.expires;
  }
  await existorder.save();
  res.status(201).json({ message: "success", result: existorder });
});

export const checkOutSuccess = catchError(async (req, res, next) => {
  res.json({ message: "success", req });
});
export const checkOutError = catchError(async (req, res, next) => {
  res.json({ message: "error", req });
});

export const checkOutSession = catchError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  console.log(order);
  if (!order) throw new AppError("Order Not Found", 404);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: order.totalPriceAfterDisc * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/api/v1/order/checkOutSuccess`,
    cancel_url: `${process.env.BASE_URL}/api/v1/order/checkOutError`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: order.address,
  });

  res.status(201).json({ message: "success", session });
});

export const createOnlineOrder = catchError(async (request, response) => {
  const sig = request.headers["stripe-signature"].toString();
  const endpointSecret =
    "whsec_a43ee41588fc01fe33567f3166320cf14c25224596cb7382575abed7bc170c9c";

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    const order = await cartFactor(checkoutSessionCompleted);
    res.json({ message: "success", order }).status(201);
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

async function cartFactor(e) {
  const cart = await cartModel.findById(e.client_reference_id);
  console.log(cart);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  const user = await userModel.findOne({ email: e.customer_email });
  const order = new orderModel({
    user: user._id,
    cartItems: cart.products,
    totalPrice: e.amount_total / 100,
    totalPriceAfterDisc: cart.totalAmountAfterDisc || cart.totalAmount,
    address: e.metadata,
    paymentMethode: "credit",
    isPaid: true,
    paidAt: Date.now(),
  });
  await order.save();

  const options = cart.products.map((el) => ({
    updateOne: {
      filter: { _id: el.product },
      update: { $inc: { stock: -el.qty, soldItems: +el.qty } },
    },
  }));
  await productModel.bulkWrite(options);
  await cartModel.findByIdAndDelete(user._id);
  return order;
}
