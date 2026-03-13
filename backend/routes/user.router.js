import express from "express";
import userController from "../controllers/userController";

const userRouter=express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile", userController.getUserProfile);
userRouter.put("/updateProfile", userController.UpdateUserProfile);
userRouter.delete("/", userController.DeleteUserProfile);

export default userRouter;