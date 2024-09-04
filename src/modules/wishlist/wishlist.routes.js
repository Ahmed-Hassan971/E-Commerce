import { Router } from "express";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";
import { addToWishlist, getWishlistDetails, removeFromWishlist } from "./controller/wishlist.controller.js";


const wishlistRouter = Router()


wishlistRouter.route("/")
    .patch(authMiddleware, allowedTo("user"), addToWishlist)
    .get(authMiddleware, allowedTo("user"), getWishlistDetails)
    .delete(authMiddleware, allowedTo("user"), removeFromWishlist)



export default wishlistRouter;