import { Route } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { CustomTrainingPage } from "../pages";

const customTrainingPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/custom-training",
  component: CustomTrainingPage,
});

export default customTrainingPageRoute;
