import { Route } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { TrainingPage } from "../pages";

const trainingPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/training",
  component: TrainingPage,
});

export default trainingPageRoute;
