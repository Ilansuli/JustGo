import styled from "@emotion/styled";
import {
  CardActionArea,
  CardProps,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  useMediaQuery,
} from "@mui/material";
import { Card as CardOrigin, Skeleton } from "../libs";
import { useEffect, useState } from "react";
import { ExerciseDetailsDrawer, PreLoadImg } from ".";
import { useImgPreLoad } from "../hooks";

const Card = styled(CardOrigin)`
  display: grid;
  padding-inline: var(--system-common-gap);
  padding-block: var(--system-common-gap);
  height: 100%;
  grid-auto-flow: column;
  grid-template-columns: 70px 1fr;
  @media (min-width: 450px) {
    grid-template-columns: unset;
    grid-auto-flow: row;
  }
`;
const CardMedia = styled(MuiCardMedia)`
  aspect-ratio: 1/1;
  background-position: top, center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: var(--system-common-gap-small);
  border-radius: var(--core-border-large);
`;

const CardContent = styled(MuiCardContent)`
  &.MuiCardContent-root:last-child {
    padding-bottom: 10px;
    padding-top: 5px;
  }
  &.MuiCardContent-root {
    padding: unset;
    padding-inline: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &::before {
      content: "&nbsp;";
      visibility: hidden;
    }
    @media (min-width: 450px) {
      justify-content: center;
      padding-inline: unset;
      gap: 2rem;
    }
  }
`;
const MainInfo = styled.div``;

const Name = styled.h3`
  //dynamic ellipses (parent el is relative)
  position: absolute;
  left: 30px;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 450px) {
    left: 0;
  }
`;

const TargetMuscle = styled.p``;

type ExerciseCardProps = {
  exercise: Exercise;
  innerRef?: (node?: Element | null | undefined) => void;
} & CardProps;

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, innerRef }) => {
  const [isExerciseDetailsDrawerOpen, setIsExerciseDetailsDrawerOpen] =
    useState(false);
  useImgPreLoad(exercise.gifEndFrameSrc);

  const mediumTheme = useMediaQuery("(min-width:450px)");

  return (
    <>
      <ExerciseDetailsDrawer
        open={isExerciseDetailsDrawerOpen}
        onClose={() => setIsExerciseDetailsDrawerOpen(false)}
        onOpen={() => setIsExerciseDetailsDrawerOpen(true)}
        anchor={
          mediumTheme
            ? document.documentElement.dir === "rtl"
              ? "right"
              : "left"
            : "bottom"
        }
        exercise={exercise}
        setIsExerciseDetailsDrawerOpen={setIsExerciseDetailsDrawerOpen}
      />
      <CardActionArea ref={innerRef}>
        <Card
          onClick={() => setIsExerciseDetailsDrawerOpen(true)}
          key={exercise.name}
        >
          <CardMedia image={exercise.gifStartFrameSrc}></CardMedia>
          <CardContent>
            <Name>{exercise.name}</Name>
            <TargetMuscle>{exercise.target}</TargetMuscle>
          </CardContent>
        </Card>
      </CardActionArea>
    </>
  );
};

export default ExerciseCard;
