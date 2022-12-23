"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const { id } = req.params;
    const method = req.method;
    switch (method) {
        case "POST":
            if (password === "") {
                console.log("Please enter password");
                return res.status(400).json({ err: "Please enter password" });
            }
            if (password.length < 8) {
                console.log("Password must be atleast more than 8 characters");
                return res
                    .status(400)
                    .json({ err: "Password must be atleast more than 8 characters" });
            }
            if (password[0] !== password[0].toUpperCase()) {
                return res
                    .status(400)
                    .json({ err: "Password first character must be uppercase letter!" });
            }
            try {
                const newUser = yield prisma.user.create({
                    data: {
                        username,
                        email,
                        password,
                    },
                });
                res.status(200).json({ message: newUser });
            }
            catch (err) {
                if (err.meta.target === "User_email_key") {
                    console.log("Email already exists");
                    res.status(400).json({ err: "Email already exists" });
                }
                else {
                    res.status(500).json({
                        message: "Internal Server Error",
                    });
                }
            }
            break;
        case "GET":
            try {
                const users = yield prisma.user.findMany();
                res.status(200).json({ users });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
            break;
        case "GET":
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
            break;
        case "PUT":
            try {
                const updateUser = yield prisma.user.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        username,
                        email,
                        password,
                    },
                });
                res.status(200).json(updateUser);
            }
            catch (err) {
                if (err.meta.target === "User_email_key") {
                    console.log("Email already exists");
                    res.status(400).json({ err: "Email already exists" });
                }
                else {
                    res.status(500).json({
                        message: "Internal Server Error",
                    });
                }
            }
            break;
        case "DELETE":
            try {
                const deleteUser = yield prisma.user.delete({
                    where: {
                        id: Number(id),
                    },
                });
                res.status(200).json(deleteUser);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
            break;
        default:
            res.status(404).json({ message: "Method not allowed" });
            break;
    }
});
exports.default = Users;
