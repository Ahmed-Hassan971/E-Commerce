import { connection } from "../DB/connection.js";
import { AppError } from "../util/AppError.js";
import addressRouter from "./modules/addresses/addresses.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import brandRouter from "./modules/brands/brands.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import { createOnlineOrder } from "./modules/order/controller/order.controller.js";
import orderRouter from "./modules/order/order.routes.js";
import productRouter from "./modules/product/product.routes.js";
import reviewRouter from "./modules/review/review.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";

const AppIndex = (app, express) => {
  orderRouter.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    createOnlineOrder
  ),
    app.use(express.json());
  connection();

  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategory", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/coupon", couponRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/order", orderRouter);

  app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
  });

  app.use((err, req, res, next) => {
    const error = err.message;
    const code = err.statusCode || 500;
    res.status(code).json({ message: "Error", error, stack: err.stack });
  });
};

export default AppIndex;
