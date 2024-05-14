import { SwipeableDrawerProps, Tabs as MuiTabs } from "@mui/material";
import {
  Chip as ChipOrigin,
  IconButton as IconButtonOrigin,
  SwipeableDrawer as SwipeableDrawerOrigin,
  Button as ButtonOrigin,
} from "../libs";
import styled from "@emotion/styled";

const SwipeableDrawer = styled(SwipeableDrawerOrigin)``;

const Header = styled.header``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-block: var(--system-common-gap-small);
  gap: var(--system-common-gap-small);
`;

const Title = styled.h2``;

const ClearFilterIcon = styled(IconButtonOrigin)``;

const FilterByTitle = styled.h4``;

const Tabs = styled(MuiTabs)`
  .MuiTabs-indicator {
    display: none;
  }
`;
const MusclesWrapper = styled.div``;

const MusclesChip = styled(ChipOrigin)`
  font-weight: bold;
`;
const EquipmentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--core-spacing-mini);
`;

const EquipmentChip = styled(ChipOrigin)`
  padding-block: var(--core-spacing-xs);
  padding-inline-start: var(--system-common-gap-small);
  font-weight: bold;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding-inline-end: var(--core-spacing-xs);
  gap: var(--system-common-gap);
  svg {
    width: 40px;
    height: 40px;
    /* fill: var(--system-global-body); */
  }
`;

const FloatingActionButton = styled(ButtonOrigin)`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-block-start: var(--core-spacing-default);
`;

type ExercisesFilterDrawerProps = {
  filterBy: {
    muscles: string[];
    equipments: string[];
  };
  setFilterBy: React.Dispatch<
    React.SetStateAction<{
      muscles: string[];
      equipments: string[];
    }>
  >;
  muscles: Muscle[];
  equipments: Equipment[];
  isEquipmentIncluded: (equipmentName: string) => boolean;
  isMuscleIncluded: (muscleName: string) => boolean;
  handleEquipment: (equipmentName: string) => void;
  handleMuscle: (muscleName: string) => void;
  setIsFilterDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & SwipeableDrawerProps;

const ExercisesFilterDrawer: React.FC<ExercisesFilterDrawerProps> = ({
  sx,
  muscles,
  equipments,
  setFilterBy,
  filterBy,
  isEquipmentIncluded,
  isMuscleIncluded,
  setIsFilterDrawerOpen,
  handleEquipment,
  handleMuscle,
  ...props
}) => {
  const clearFilterBy = () => {
    setFilterBy({ muscles: [], equipments: [] });
  };

  return (
    <SwipeableDrawer sx={sx as any} {...props}>
      <Header>
        {filterBy.muscles.length > 0 || filterBy.equipments.length > 0 ? (
          <TitleWrapper>
            <Title>Filtered</Title>
            <ClearFilterIcon
              onClick={clearFilterBy}
              iconName={"DeleteOutlineSharp"}
            />
          </TitleWrapper>
        ) : (
          <TitleWrapper>
            <Title>All Exercises</Title>
          </TitleWrapper>
        )}

        <MusclesWrapper>
          <TitleWrapper>
            <FilterByTitle>Focus Area</FilterByTitle>
            <span>
              ({filterBy.muscles.length === 0 ? "All" : filterBy.muscles.length}
              )
            </span>
          </TitleWrapper>
          {/* the value in <Tabs/> is only to get the error out, tabs are not used usually for this usecase */}
          <Tabs value={0} variant="scrollable" scrollButtons={false}>
            {muscles.map((muscle: string) => (
              <MusclesChip
                variant={isMuscleIncluded(muscle) ? "filled" : "outlined"}
                key={muscle}
                label={muscle}
                onClick={() => {
                  handleMuscle(muscle);
                }}
              />
            ))}
          </Tabs>
        </MusclesWrapper>

        <TitleWrapper>
          <FilterByTitle>Equipments</FilterByTitle>
          <span>
            (
            {filterBy.equipments.length === 0
              ? "All"
              : filterBy.equipments.length}
            )
          </span>
        </TitleWrapper>
      </Header>
      <EquipmentsWrapper>
        {equipments.map((equipment: Equipment) => (
          <EquipmentChip
            variant={
              isEquipmentIncluded(equipment.name) ? "filled" : "outlined"
            }
            onClick={() => {
              handleEquipment(equipment.name);
            }}
            key={equipment.name}
            label={equipment.name}
            icon={<equipment.icon />}
          />
        ))}
      </EquipmentsWrapper>
      <FloatingActionButton
        onClick={() => setIsFilterDrawerOpen(false)}
        variant="contained"
      >
        DONE
      </FloatingActionButton>
    </SwipeableDrawer>
  );
};
export default ExercisesFilterDrawer;
