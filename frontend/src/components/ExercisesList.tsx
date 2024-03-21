import styled from "@emotion/styled";
import ExerciseCard from "./ExerciseCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpService } from "../services";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "../hooks";
import { Loader } from "../libs";
import ExerciseDetailsDrawer from "./ExerciseDetailsDrawer";
import { useMediaQuery } from "@mui/material";

const List = styled.ul`
  display: grid;
  flex-direction: row;
  gap: 1rem;
  gap: var(--core-spacing-mini);
  padding-block-end: var(--system-common-gap);
  @media (min-width: 450px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

type ExercisesListProps = {
  search: string;
  filterBy: {
    muscles: string[];
    equipments: string[];
  };
};

const ExercisesList: React.FC<ExercisesListProps> = forwardRef(
  ({ search, filterBy }) => {
    const [currExercise, setCurrExercise] = useState<Exercise | null>(null);

    const { ref, inView } = useInView();
    const debouncedSearchTerm = useDebounce(search, 800);
    const debouncedFilterByTerm = useDebounce(filterBy, 800);

    const {
      error,
      status,
      data: exercises,
      hasNextPage,
      isSuccess,
      fetchNextPage,
    } = useInfiniteQuery({
      getNextPageParam: (lastPage) => lastPage.nextId,
      queryKey: ["exercise", debouncedSearchTerm, debouncedFilterByTerm],
      initialPageParam: 1,
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        return await httpService.get(
          `exercise?query=${search}&muscles=${filterBy.muscles.map((muscle) =>
            muscle.toLowerCase()
          )}&equipments=${filterBy.equipments.map((equipment) =>
            equipment.toLowerCase()
          )}&pageParam=${pageParam}&limit=50`
        );
      },
    });

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);

    if (status === "error") return <h1>Error:{error?.message}</h1>;

    if (status === "pending") return <Loader height="50dvh" />;

    return (
      <>
        {isSuccess && (
          <>
            <List>
              {exercises?.pages.map((page) => {
                return page.data?.map((exercise: Exercise, index: number) => {
                  if (page.data.length == index + 1) {
                    return (
                      <ExerciseCard
                        innerRef={ref}
                        key={exercise._id}
                        exercise={exercise}
                      />
                    );
                  }
                  return (
                    <ExerciseCard key={exercise._id} exercise={exercise} />
                  );
                });
              })}
            </List>
          </>
        )}
        {hasNextPage && <Loader height="20dvh" />}
      </>
    );
  }
);
export default ExercisesList;
