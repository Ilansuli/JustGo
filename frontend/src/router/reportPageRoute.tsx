import { Route } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { ReportPage } from "../pages";

const reportPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/report",
  component: ReportPage,
});

export default reportPageRoute;
