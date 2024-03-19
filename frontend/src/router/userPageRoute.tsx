import { Route } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { UserPage } from "../pages";

const userPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: UserPage,
});

export default userPageRoute;
