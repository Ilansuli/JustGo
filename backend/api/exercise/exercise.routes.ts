import { Router } from "express";

import {
  getExerciseById,
  getExercises,
  addExercise,
} from "./exercise.controller";

export const router = Router();

router.get("/", getExercises);
router.get("/:id", getExerciseById);
router.post("/", addExercise);
