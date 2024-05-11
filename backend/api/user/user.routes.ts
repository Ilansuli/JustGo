import { Router } from "express";

import { getUserById, getUsers } from "./user.controller";

export const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
