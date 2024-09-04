import mongoose from "mongoose";
export function connection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/final")
    .then(() => {
      console.log("DB Connection");
    })
    .catch((err) => {
      console.log("DB Error", err);
    });
}
