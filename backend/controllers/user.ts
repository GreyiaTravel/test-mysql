import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Users = async (req: Request, res: Response) => {
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
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });

        res.status(200).json({ message: newUser });
      } catch (err: any) {
        if (err.meta.target === "User_email_key") {
          console.log("Email already exists");

          res.status(400).json({ err: "Email already exists" });
        } else {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }
      }

      break;

    case "GET":
      try {
        const users = await prisma.user.findMany();

        res.status(200).json({ users });
      } catch (error) {
        res.status(400).json({ error: error });
      }

      break;

    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(id),
          },
        });

        res.status(200).json({ user });
      } catch (error) {
        res.status(400).json({ error: error });
      }

      break;

    case "PUT":
      try {
        const updateUser = await prisma.user.update({
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
      } catch (err: any) {
        if (err.meta.target === "User_email_key") {
          console.log("Email already exists");

          res.status(400).json({ err: "Email already exists" });
        } else {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }
      }

      break;

    case "DELETE":
      try {
        const deleteUser = await prisma.user.delete({
          where: {
            id: Number(id),
          },
        });

        res.status(200).json(deleteUser);
      } catch (error) {
        res.status(400).json({ error: error });
      }

      break;

    default:
      res.status(404).json({ message: "Method not allowed" });
      break;
  }
};

export default Users;
