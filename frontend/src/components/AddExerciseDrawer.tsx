import {
  InputAdornment,
  SwipeableDrawerProps,
  Tabs as MuiTabs,
} from "@mui/material";
import {
  Button as ButtonOrigin,
  Chip as ChipOrigin,
  Loader,
  SwipeableDrawer,
  TextField as TextFieldOrigin,
} from "../libs";
import styled from "@emotion/styled";
import { Mode, PhotoCamera as MuiPhotoCamera } from "@mui/icons-material";
import { useRef, useState } from "react";
import { httpService } from "../services";
import { useMutation } from "@tanstack/react-query";
import { addExercise } from "../services/exercise.service";

const Header = styled.header`
  display: flex;
  justify-content: start;
  margin-block-end: var(--core-spacing-xs);
`;

const Title = styled.h3``;

const SubTitle = styled.h4``;

const Form = styled.form``;

const ChooseImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-block-end: var(--core-spacing-xs);
`;

const ImgUpload = styled.input`
  display: none;
`;

const ImageTitle = styled.h2``;

type ChooseImageBtnProps = { imagePreview?: string };

const ChooseImageBtn = styled(ButtonOrigin)<ChooseImageBtnProps>`
  ${({ imagePreview }) =>
    imagePreview &&
    `background-image: url('${imagePreview}');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 64px;
    min-height: 69px;`};
  display: flex;
  justify-content: center;
  background-color: var(--system-global-body_01);
  padding-block: var(--core-spacing-xxs);
  padding-inline: var(--core-spacing-mini);
  cursor: pointer;
  &.MuiButton-outlined {
    background-color: var(--system-global-body_01);
    border: unset;
    &:hover {
      border: unset;
      color: var(--system-global-body);
    }
  }
`;

const PhotoCamera = styled(MuiPhotoCamera)`
  position: absolute;
  top: 57px;
  left: 50px;
`;

const SubFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-xxxs);
  margin-block-end: var(--core-spacing-xs);
`;

const NameTextField = styled(TextFieldOrigin)`
  width: 100%;
  .MuiInputBase-input {
    height: unset;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const Tabs = styled(MuiTabs)`
  .MuiTabs-indicator {
    display: none;
  }
`;

const Chip = styled(ChipOrigin)`
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-xxs);
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-block-start: var(--core-spacing-xxs);
`;

const SaveBtn = styled(ButtonOrigin)``;

const CancelBtn = styled(ButtonOrigin)``;

type AddExerciseDrawerProps = {
  muscles: Muscle[];
  equipments: Equipment[];
  setIsAddExerciseDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & SwipeableDrawerProps;

const AddExerciseDrawer: React.FC<AddExerciseDrawerProps> = ({
  sx,
  muscles,
  equipments,
  setIsAddExerciseDrawerOpen,
  ...props
}) => {
  const imgUploadInputRef = useRef<HTMLInputElement | null>(null);

  const [newExerciseFormData, setNewExerciseFormData] = useState<Exercise>({
    imgSrc: null,
    name: "",
    target: "",
    equipment: "",
  });

  const [imagePreview, setImagePreview] = useState<{
    isLoading: boolean;
    src: string;
  } | null>(null);

  const isFormValid = () => {
    return (
      newExerciseFormData.imgSrc !== null &&
      newExerciseFormData.name.trim() !== "" &&
      newExerciseFormData.target.length > 0 &&
      newExerciseFormData.equipment.length > 0
    );
  };

  const handleChooseImageBtn = () => {
    if (imgUploadInputRef.current) {
      imgUploadInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagePreview({
        isLoading: true,
        src: "",
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview({
          isLoading: false,
          src: reader.result as string,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
      setNewExerciseFormData({
        ...newExerciseFormData,
        imgSrc: e.target.files[0],
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExerciseFormData({
      ...newExerciseFormData,
      name: e.target.value,
    });
  };

  const handleMuscle = (muscleName: Muscle) => {
    if (newExerciseFormData.target === muscleName) {
      setNewExerciseFormData(() => ({
        ...newExerciseFormData,
        target: "",
      }));
    } else {
      setNewExerciseFormData(() => ({
        ...newExerciseFormData,
        target: muscleName,
      }));
    }
  };

  const handleEquipment = (equipmentName: Equipment["name"]) => {
    if (newExerciseFormData.equipment === equipmentName) {
      setNewExerciseFormData(() => ({
        ...newExerciseFormData,
        equipment: "",
      }));
    } else {
      setNewExerciseFormData(() => ({
        ...newExerciseFormData,
        equipment: equipmentName,
      }));
    }
  };

  const addExerciseMutation = useMutation({
    mutationFn: addExercise,
  });

  const handleAddExercise = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /////CHANGE THE OPTION FOR MULTIPLE MUSCLES AND EQs ,ONLY ONE IS PERMMITED AND IT WILL SOLVE EVERYTHING. WE DONT WANT THEM AS ARRAY
    addExerciseMutation.mutate({ newExerciseFormData });
    console.log("Form submitted:", newExerciseFormData);
  };

  return (
    <SwipeableDrawer sx={sx as any} {...props}>
      <Header>
        <Title>New Exercise</Title>
      </Header>
      <Form onSubmit={handleAddExercise}>
        <ChooseImageWrapper>
          {!imagePreview ? (
            <ChooseImageBtn
              onClick={() => handleChooseImageBtn()}
              variant="outlined"
            >
              <ImageTitle>
                {newExerciseFormData.name.trim()
                  ? newExerciseFormData.name.slice(0, 1).toUpperCase() +
                    newExerciseFormData.name.slice(1, 2).toUpperCase()
                  : "EX"}
              </ImageTitle>
              <PhotoCamera />
            </ChooseImageBtn>
          ) : (
            <>
              {imagePreview.isLoading ? (
                //height of the ImageBtn
                <Loader height="68px" />
              ) : (
                <ChooseImageBtn
                  onClick={() => handleChooseImageBtn()}
                  imagePreview={imagePreview.src}
                />
              )}
            </>
          )}

          <ImgUpload
            type="file"
            ref={imgUploadInputRef}
            onChange={handleImageChange}
          />
        </ChooseImageWrapper>

        <SubFormWrapper>
          <SubTitle>Name</SubTitle>

          <NameTextField
            onChange={handleNameChange}
            placeholder="Create a name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mode />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          ></NameTextField>
        </SubFormWrapper>

        <SubFormWrapper>
          <SubTitle>Muscle</SubTitle>

          {/* the value in <Tabs/> is only to get the error out, tabs are not used usually for this usecase */}
          <Tabs value={0} variant="scrollable" scrollButtons={false}>
            {muscles.map((muscle: string) => (
              <Chip
                variant={
                  newExerciseFormData.target === muscle ? "filled" : "outlined"
                }
                key={muscle}
                label={muscle}
                onClick={() => {
                  handleMuscle(muscle);
                }}
              />
            ))}
          </Tabs>
        </SubFormWrapper>

        <SubFormWrapper>
          <SubTitle>Equipment</SubTitle>

          {/* the value in <Tabs/> is only to get the error out, tabs are not used usually for this usecase */}
          <Tabs value={0} variant="scrollable" scrollButtons={false}>
            {equipments.map((equipment: Equipment) => (
              <Chip
                variant={
                  newExerciseFormData.equipment === equipment.name
                    ? "filled"
                    : "outlined"
                }
                key={equipment.name}
                label={equipment.name}
                onClick={() => {
                  handleEquipment(equipment.name);
                }}
              />
            ))}
          </Tabs>
        </SubFormWrapper>

        <ActionButtons>
          <SaveBtn disabled={!isFormValid()} type="submit" variant="contained">
            Save
          </SaveBtn>

          <CancelBtn
            onClick={() => setIsAddExerciseDrawerOpen(false)}
            variant="outlined"
          >
            Cancel
          </CancelBtn>
        </ActionButtons>
      </Form>
    </SwipeableDrawer>
  );
};
export default AddExerciseDrawer;
