import {
  SwipeableDrawerProps,
  Tab as MuiTab,
  Tabs as MuiTabs,
} from "@mui/material";
import {
  FloatingActionButton as FloatingActionButtonOrigin,
  IconButton as IconButtonOrigin,
  SwipeableDrawer as SwipeableDrawerOrigin,
  Tabs,
  TextField,
} from "../libs";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useImgPreLoad } from "../hooks";

const SwipeableDrawer = styled(SwipeableDrawerOrigin)`
  .MuiDrawer-paper {
    height: 92dvh;
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    padding-block: 1rem;
    padding-inline: 1rem;
    @media (min-width: 450px) {
      min-height: 100dvh;
      max-width: 350px;
      border-top-right-radius: unset;
      border-top-left-radius: unset;
    }
  }
`;

const Tab = styled(MuiTab)`
  font-weight: 600;
`;

const ExerciseGifPreview = styled.section`
  margin-block: 1rem;
  margin-inline: 0.5rem;
  padding-block: 0.1rem;
  padding-inline: 0.1rem;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  border-radius: 10px;
  background: ${({ theme }) => (theme === "light" ? "none" : "white")};
  position: relative;
`;

const GifWrapper = styled.div`
  width: 50%;
`;
type ImgWrapperProps = {
  src: string | undefined;
};

const ImgWrapper = styled.div<ImgWrapperProps>`
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: top, center;
  background-repeat: no-repeat;
  aspect-ratio: 1 / 1;
  width: 100%;
  mix-blend-mode: ${({ theme }) => (theme === "light" ? "multiply" : "unset")};
`;

const Img = styled.img`
  mix-blend-mode: ${({ theme }) => (theme === "light" ? "multiply" : "unset")};
`;
const ExerciseGif = styled(ImgWrapper)`
  border-radius: 10px;
`;
const ExerciseStartImg = styled(Img)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const ExerciseEndImg = styled(Img)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ToggleGifButton = styled(IconButtonOrigin)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const TitleWrapper = styled.section``;
const Title = styled.h1``;
const SubTitle = styled.h4``;
const MainDetails = styled.div``;
const DetailWrapper = styled.div``;
const Details = styled.p``;
const ExecutionWrapper = styled.section``;
const ExecutionDetailsList = styled.ul``;
const ExecutionDetailsItem = styled.li`
  display: flex;
  gap: 1rem;
`;
const Number = styled.span`
  font-weight: 800;
`;
const Execution = styled.p``;

const FloatingActionButton = styled(FloatingActionButtonOrigin)`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-block-start: 1rem;
`;
type ExerciseDetailsDrawerProps = {
  exercise: Exercise;
  setIsExerciseDetailsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & SwipeableDrawerProps;

const ExerciseDetailsDrawer: React.FC<ExerciseDetailsDrawerProps> = ({
  sx,
  exercise,
  setIsExerciseDetailsDrawerOpen,
  ...props
}) => {
  const [isGif, setIsGif] = useState(false);
  const [currTabIdx, setCurrTabIdx] = useState(0);
  useImgPreLoad(exercise?.gifSrc);

  const theme = document.documentElement.dataset.theme;
  const handleCurrTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setCurrTabIdx(newValue);
  };

  return (
    <SwipeableDrawer sx={sx as any} {...props}>
      <Tabs
        value={currTabIdx}
        onChange={handleCurrTabChange}
        centered={true}
        variant="fullWidth"
      >
        <Tab label="INSTRUCTIONS" />
        <Tab label="RECORDS" />
      </Tabs>
      {currTabIdx === 0 ? (
        <>
          <ExerciseGifPreview theme={theme}>
            {isGif ? (
              <GifWrapper>
                <ExerciseGif theme={theme} src={exercise?.gifSrc} />
              </GifWrapper>
            ) : (
              <>
                <ExerciseStartImg
                  loading="lazy"
                  theme={theme}
                  src={exercise?.gifStartFrameSrc}
                  decoding="async"
                ></ExerciseStartImg>
                <ExerciseEndImg
                  loading="lazy"
                  decoding="async"
                  theme={theme}
                  src={exercise?.gifEndFrameSrc}
                ></ExerciseEndImg>
              </>
            )}
            {isGif ? (
              <ToggleGifButton
                onClick={() => {
                  setIsGif(false);
                }}
                iconName="Image"
              />
            ) : (
              <ToggleGifButton
                onClick={() => {
                  setIsGif(true);
                }}
                iconName="GifBox"
              />
            )}
          </ExerciseGifPreview>
          <TitleWrapper>
            <Title>
              {exercise?.name &&
                exercise?.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
            </Title>
            <Title>
              {exercise?.equipment &&
                exercise?.equipment.charAt(0).toUpperCase() +
                  exercise.equipment.slice(1)}
            </Title>
            <TextField variant="filled" />
            <MainDetails>
              <DetailWrapper>
                <SubTitle>FOCUS AREA</SubTitle>
                <Details>
                  {[
                    exercise?.target,
                    ...(exercise?.secondaryMuscles
                      ? [exercise?.secondaryMuscles]
                      : []),
                  ].join(", ")}
                </Details>
              </DetailWrapper>
              <DetailWrapper>
                <SubTitle>EQUIPMENT</SubTitle>
                <Details>{exercise?.equipment}</Details>
              </DetailWrapper>
            </MainDetails>
          </TitleWrapper>
          <ExecutionWrapper>
            <Title>EXECUTION</Title>
            <ExecutionDetailsList>
              {exercise?.instructions.map((sentence: string, index) => {
                return (
                  <ExecutionDetailsItem key={index}>
                    <Number>{index + 1}</Number>
                    <Execution>{sentence}</Execution>
                  </ExecutionDetailsItem>
                );
              })}
            </ExecutionDetailsList>
          </ExecutionWrapper>
        </>
      ) : (
        <></>
      )}
      <FloatingActionButton
        onClick={() => setIsExerciseDetailsDrawerOpen(false)}
        variant="extended"
      >
        DONE
      </FloatingActionButton>
    </SwipeableDrawer>
  );
};
export default ExerciseDetailsDrawer;
