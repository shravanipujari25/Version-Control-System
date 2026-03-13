import express from "express";
import userRouter from "./user.router";
import repoRouter from "./repo.roter";

const mainRouter=express.Router();


mainRouter.use(userRouter);
mainRouter.use(repoRouter);


mainRouter.get("/",(req,res)=>{
      res.send("Welcome to github clone");
    });

export default mainRouter;