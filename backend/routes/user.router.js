import express from "express";
import userController from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", userController.UpdateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.DeleteUserProfile);

export default userRouter;