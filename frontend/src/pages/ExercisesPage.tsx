import styled from "@emotion/styled";
import {
  Button as ButtonOrigin,
  Container as ContainerOrigin,
  IconButton as IconButtonOrigin,
  TextField as TextFieldOrigin,
  FloatingActionButton as FloatingActionButtonOrigin,
} from "../libs";
import {
  AssistedIcon,
  BandIcon,
  BarbellIcon,
  BodyWeightIcon,
  BosuBallIcon,
  CableIcon,
  DumbellIcon,
  EllipticalMachineIcon,
  EzBarbellIcon,
  KettleBellIcon,
  MedicineBallIcon,
  RollerIcon,
  RopeIcon,
  SmithMachineIcon,
  SquatMachineIcon,
  StabillityBallIcon,
  WeightedIcon,
} from "../assets/icons/equipments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { ExerciseHeader, ExercisesList } from "../components";
import { Add } from "@mui/icons-material";

const Wrapper = styled.section`
  min-height: 100dvh;
`;

const FloatingActionButton = styled(FloatingActionButtonOrigin)`
  position: fixed;
  bottom: 70px;
  right: 10px;
  @media (min-width: 450px) {
    /* bottom: 30px;
    right: 23px; */
    gap: 0.5rem;
  }
  @media (min-width: 700px) {
    bottom: 30px;
    right: 23px;
  }
`;

const ExercisesPage: React.FC = ({}) => {
  const [search, setSearch] = useState<string>("");
  const [filterBy, setFilterBy] = useState<{
    muscles: string[];
    equipments: string[];
  }>({
    muscles: [],
    equipments: [],
  });
  const mediumTheme = useMediaQuery("(min-width:450px)");

  const muscles = [
    "Triceps",
    "Abs",
    "Adductors",
    "Biceps",
    "Calves",
    "Cardiovascular system",
    "Delts",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Levator scapulae",
    "Chest",
    "Quads",
    "Serratus anterior",
    "Spine",
    "Traps",
    "Upper back",
  ];
  const equipments: Equipment[] = [
    { name: "Assisted", icon: AssistedIcon },
    { name: "Resistance band", icon: BandIcon },
    { name: "Barbell", icon: BarbellIcon },
    { name: "Body weight", icon: BodyWeightIcon },
    { name: "Bosu ball", icon: BosuBallIcon },
    { name: "Cable", icon: CableIcon },
    { name: "Dumbbell", icon: DumbellIcon },
    { name: "Elliptical machine", icon: EllipticalMachineIcon },
    { name: "Ez barbell", icon: EzBarbellIcon },
    { name: "Kettlebell", icon: KettleBellIcon },
    { name: "Medicine ball", icon: MedicineBallIcon },
    { name: "Rope", icon: RopeIcon },
    { name: "Squat machine", icon: SquatMachineIcon },
    { name: "Smith machine", icon: SmithMachineIcon },
    { name: "Stability ball", icon: StabillityBallIcon },
    { name: "Weighted", icon: WeightedIcon },
    { name: "Wheel roller", icon: RollerIcon },
  ];

  return (
    <>
      <Wrapper>
        <ExerciseHeader
          equipments={equipments}
          filterBy={filterBy}
          muscles={muscles}
          search={search}
          setSearch={setSearch}
          setFilterBy={setFilterBy}
        />
        {!mediumTheme ? (
          //MOBILE
          <>
            <ExercisesList filterBy={filterBy} search={search} />
            <FloatingActionButton>
              <Add />
            </FloatingActionButton>
          </>
        ) : (
          //TABLET AND BEYOND
          <>
            <ContainerOrigin>
              <ExercisesList filterBy={filterBy} search={search} />
            </ContainerOrigin>
            <FloatingActionButton variant="extended">
              <Add />
              Add Exercise
            </FloatingActionButton>
          </>
        )}
      </Wrapper>
    </>
  );
};
export default ExercisesPage;
