import express from "express";
import Users from "../controllers/user";

const router = express.Router();

router.route("/").get(Users).post(Users);
router.route("/:id").get(Users).put(Users).delete(Users);

export default router;
