import express from "express";
import { create, fetch, update, deleteUser } from "../controller/taskController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getalltasks", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;