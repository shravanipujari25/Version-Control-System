import express from "express";
import repoController from "../controllers/repoController.js";

const repoRouter=express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/rep/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/:name",repoController.fetchRepositoryName);
repoRouter.get("/repo/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);


export default repoRouter;