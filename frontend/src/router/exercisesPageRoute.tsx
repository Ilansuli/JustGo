import { Route } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { ExercisesPage } from "../pages";

const exercisesPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/exercises",
  component: ExercisesPage,
});

export default exercisesPageRoute;
