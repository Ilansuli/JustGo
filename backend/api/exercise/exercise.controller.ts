import { loggerService } from "../../services/logger.service";
import { Request, Response } from "express";
import { add, exercisesQuery, getById } from "./exercise.service";

export async function getExercises(req: Request, res: Response) {
  try {
    const exercises = await exercisesQuery({
      query: req.query.query || "",
      pageParam: +req.query.pageParam || undefined,
      limit: +req.query.limit || undefined,
      //arrays comes as strings, so they need to be turned into array again,
      // if i want it empty i change it from [''] to []
      muscles:
        req.query.muscles === ""
          ? []
          : (req.query.muscles as string).split(","),
      equipments:
        req.query.equipments === ""
          ? []
          : (req.query.equipments as string).split(","),
    });
    res.send(exercises);
  } catch (err) {
    loggerService.error("Failed to get exercises", err);
    res.status(500).send({ err: "Failed to get exercises" });
  }
}

export async function getExerciseById(req: Request, res: Response) {
  try {
    const exerciseId = req.params.id;
    const exercise = await getById(exerciseId);
    res.json(exercise);
  } catch (err) {
    loggerService.error("Failed to get exercise", err);
    res.status(500).send({ err: "Failed to get exercise" });
  }
}

export async function addExercise(req, res) {
  const { loggedinUser } = req;
  try {
    const exercise = req.body;
    exercise.owner = loggedinUser;
    const addedExercise = await add(exercise);
    res.json(addedExercise);
  } catch (err) {
    loggerService.error("Failed to add exercise", err);
    res.status(500).send({ err: "Failed to add exercise" });
  }
}
