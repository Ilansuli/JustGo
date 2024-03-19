import catchAllRoute from "./catchAllRoute";
import customTrainingPageRoute from "./customTrainingPageRoute";
import exercisesPageRoute from "./exercisesPageRoute";
import trainingPageRoute from "./trainingPageRoute";
import reportPageRoute from "./reportPageRoute";
import userPageRoute from "./userPageRoute";

export const routes = [
  customTrainingPageRoute,
  trainingPageRoute,
  exercisesPageRoute,
  reportPageRoute,
  userPageRoute,
  catchAllRoute,
];
