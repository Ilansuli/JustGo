import styled from "@emotion/styled";
import {
  CardActionArea,
  CardProps,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
} from "@mui/material";
import { Card as CardOrigin, Skeleton } from "../libs";
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

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  innerRef,
  onClick,
}) => {
  useImgPreLoad(exercise.gifEndFrameSrc);
  return (
    <CardActionArea ref={innerRef}>
      <Card onClick={onClick} key={exercise.name}>
        <CardMedia image={exercise.gifStartFrameSrc}></CardMedia>
        <CardContent>
          <Name>{exercise.name}</Name>
          <TargetMuscle>{exercise.target}</TargetMuscle>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ExerciseCard;
