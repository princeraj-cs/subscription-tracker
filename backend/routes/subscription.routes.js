import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions, deleteSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter =  Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET all subscriptions"}))

subscriptionRouter.get("/:id", (req, res) => res.send({ title: "GET subscriptions details"}))

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", (req, res) => res.send({ title: "UPDATE subscriptions"}))

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)
    
subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL subscriptions"}))

subscriptionRouter.get("/upcoming", (req, res) => res.send({ title: "GET upcoming renewals"}))

export default subscriptionRouter;