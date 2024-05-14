import {
  SwipeableDrawerProps,
  Tab as MuiTab,
  Tabs as MuiTabs,
  InputAdornment,
} from "@mui/material";
import {
  Button as ButtonOrigin,
  IconButton as IconButtonOrigin,
  SwipeableDrawer,
  Tabs,
  TextField as TextFieldOrigin,
} from "../libs";
import styled from "@emotion/styled";
import { useState } from "react";
import { useImgPreLoad } from "../hooks";
import { Mode } from "@mui/icons-material";

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
const Header = styled.header``;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--core-spacing-micro);
  margin-block-end: 1.5rem;
`;
const Title = styled.h2``;
const Bullet = styled.span`
  font-size: 2rem;
`;
const TextField = styled(TextFieldOrigin)`
  width: 100%;
  margin-block-end: 1.5rem;
  .MuiInputBase-input {
    height: unset;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
const SubTitle = styled.h4`
  gap: var(--core-spacing-mini);
`;
const MainDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-mini);
  margin-block-end: 1.5rem;
`;
const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--core-spacing-mini);
`;
const Details = styled.p``;
const ExecutionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-xs);
`;
const ExecutionDetailsList = styled.ul`
  margin-block-end: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-xxs);
`;
const ExecutionDetailsItem = styled.li`
  display: flex;
  gap: var(--core-spacing-xxs);
`;
const Number = styled.span`
  font-weight: 800;
`;
const Execution = styled.p``;

const FloatingActionButton = styled(ButtonOrigin)`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-block-start: 1rem;
`;
type ExerciseDetailsDrawerProps = {
  exercise: Exercise | null;
  setIsExerciseDetailsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGif: boolean;
  setIsGif: React.Dispatch<React.SetStateAction<boolean>>;
} & SwipeableDrawerProps;

const ExerciseDetailsDrawer: React.FC<ExerciseDetailsDrawerProps> = ({
  sx,
  exercise,
  setIsExerciseDetailsDrawerOpen,
  isGif,
  setIsGif,
  ...props
}) => {
  const theme = document.documentElement.dataset.theme;

  const [currTabIdx, setCurrTabIdx] = useState(0);

  // optimistic approach for exercise.gifSrc
  useImgPreLoad(exercise?.gifSrc as string);

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
          <Header>
            <TitleWrapper>
              <Title>
                {exercise?.name &&
                  exercise?.name.charAt(0).toUpperCase() +
                    exercise.name.slice(1)}
              </Title>
              <Bullet>•</Bullet>
              <Title>
                {exercise?.equipment &&
                  exercise?.equipment.charAt(0).toUpperCase() +
                    exercise.equipment.slice(1)}
              </Title>
            </TitleWrapper>
            <TextField
              placeholder="Add Note"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mode />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
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
          </Header>
          <ExecutionWrapper>
            <Title>EXECUTION</Title>
            <ExecutionDetailsList>
              {exercise?.instructions?.map((sentence: string, index) => {
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
        variant="contained"
      >
        DONE
      </FloatingActionButton>
    </SwipeableDrawer>
  );
};
export default ExerciseDetailsDrawer;
