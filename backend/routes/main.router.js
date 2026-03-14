import express from "express";
import userRouter from "./user.router.js";
import repoRouter from "./repo.roter.js";
import issueRouter from "./issue.router.js";

const mainRouter=express.Router();


mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);


mainRouter.get("/",(req,res)=>{
      res.send("Welcome to github clone");
    });

export default mainRouter;