import { Navigate, Route, redirect } from "@tanstack/react-router";
import rootRoute from "./rootRoute";

const catchAllRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to={"/"} />,
});

export default catchAllRoute;
