import { loggerService } from "../../services/logger.service";
import { Request, Response } from "express";
import { usersQuery, getById } from "./user.service";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await usersQuery({
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
    res.send(users);
  } catch (err) {
    loggerService.error("Failed to get users", err);
    res.status(500).send({ err: "Failed to get users" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await getById(userId);
    res.json(user);
  } catch (err) {
    loggerService.error("Failed to get station", err);
    res.status(500).send({ err: "Failed to get station" });
  }
}
