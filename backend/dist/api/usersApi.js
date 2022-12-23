"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.route("/").get(user_1.default).post(user_1.default);
router.route("/:id").get(user_1.default).put(user_1.default).delete(user_1.default);
exports.default = router;
