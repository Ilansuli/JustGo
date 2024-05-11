import httpService from "./http.service";

export const fetchExercises = async (
  search: string,
  filterBy: {
    muscles: string[];
    equipments: string[];
  },
  pageParam: number,
  limit: number
) => {
  return await httpService.get(
    `exercise?query=${search}&muscles=${filterBy.muscles.map((muscle) =>
      muscle.toLowerCase()
    )}&equipments=${filterBy.equipments.map((equipment) =>
      equipment.toLowerCase()
    )}&pageParam=${pageParam}&limit=${limit}`
  );
};

export const addExercise = async (exercise: Exercise) => {
  return await httpService.post("exercise");
};
