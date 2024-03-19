import styled from "@emotion/styled";
import {
  Button as ButtonOrigin,
  Chip as ChipOrigin,
  Container as ContainerOrigin,
  IconButton as IconButtonOrigin,
  TextField as TextFieldOrigin,
} from "../libs";
import { ExercisesFilterDrawer, ExercisesList } from "../components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InputAdornment, Stack } from "@mui/material";
import { Search, CancelRounded, FilterList } from "@mui/icons-material";
import { useRef, useState } from "react";

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--core-z-index-sticky);
  background-color: var(--system-global-background);
  @media (min-width: 450px) {
    position: unset;
    z-index: unset;
  }
`;

const HeaderContainer = styled(ContainerOrigin)`
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;
  gap: var(--core-spacing-micro);
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 40px 1fr;
  @media (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
  }
`;

const Title = styled.h1``;

const TextField = styled(TextFieldOrigin)`
  .MuiInputBase-root.MuiOutlinedInput-root {
    background: var(--component-main-header-input-background);
    padding-left: var(--core-spacing-mini);
    padding-right: unset;
  }
`;

const SortMobileButton = styled(ButtonOrigin)`
  grid-row: 2;
  grid-column: 1;
  justify-self: start;
`;

const CloseSearchButton = styled(ButtonOrigin)`
  grid-row: 1;
`;

const SearchIconButton = styled(IconButtonOrigin)`
  grid-row: 1;
`;

const FilterByWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / span2;
`;

const FilterByTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--system-common-gap-small);
  padding-block: var(--system-common-gap-small);
`;

const FilterByTitle = styled.h4``;

const MusclesWrapper = styled.div``;

const EquipmentsWrapper = styled(MusclesWrapper)``;

const Chip = styled(ChipOrigin)`
  font-weight: bold;
`;
type ExerciseHeaderProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
};

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  search,
  setSearch,
  filterBy,
  setFilterBy,
  muscles,
  equipments,
}) => {
  const [isMobileSearch, setIsMobileSearch] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const mediumTheme = useMediaQuery("(min-width:450px)");

  const isMuscleIncluded = (muscleName: string) => {
    return filterBy.muscles.includes(muscleName);
  };
  const isEquipmentIncluded = (equipmentName: string) => {
    return filterBy.equipments.includes(equipmentName);
  };

  const handleMuscle = (muscleName: string) => {
    isMuscleIncluded(muscleName)
      ? setFilterBy((prev) => ({
          ...prev,
          muscles: [...prev.muscles.filter((mus) => mus !== muscleName)],
        }))
      : setFilterBy((prev) => ({
          ...prev,
          muscles: [...prev.muscles, muscleName],
        }));
  };

  const handleEquipment = (equipmentName: string) => {
    isEquipmentIncluded(equipmentName)
      ? setFilterBy((prev) => ({
          ...prev,
          equipments: [
            ...prev.equipments.filter((eqName) => eqName !== equipmentName),
          ],
        }))
      : setFilterBy((prev) => ({
          ...prev,
          equipments: [...prev.equipments, equipmentName],
        }));
  };
  return (
    <>
      {!mediumTheme ? (
        //MOBILE
        <>
          <ExercisesFilterDrawer
            muscles={muscles}
            equipments={equipments}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            anchor="bottom"
            open={isFilterDrawerOpen}
            isEquipmentIncluded={isEquipmentIncluded}
            isMuscleIncluded={isMuscleIncluded}
            setIsFilterDrawerOpen={setIsFilterDrawerOpen}
            handleEquipment={handleEquipment}
            handleMuscle={handleMuscle}
            onOpen={() => setIsFilterDrawerOpen(true)}
            onClose={() => setIsFilterDrawerOpen(false)}
          />
          <Header>
            <HeaderContainer>
              {isMobileSearch ? (
                <>
                  <TextField
                    fullWidth
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    variant="outlined"
                    size="small"
                    placeholder="Search exercises"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      endAdornment: search && (
                        <InputAdornment
                          position="end"
                          onClick={() => setSearch("")}
                        >
                          <IconButtonOrigin iconName="CancelRounded" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CloseSearchButton
                    variant="text"
                    onClick={() => setIsMobileSearch(false)}
                  >
                    Close
                  </CloseSearchButton>
                </>
              ) : (
                <>
                  <Title>Exercises</Title>
                  <SearchIconButton
                    iconName="Search"
                    onClick={() => setIsMobileSearch(true)}
                  ></SearchIconButton>
                </>
              )}
              <SortMobileButton
                onClick={() => setIsFilterDrawerOpen(true)}
                variant="text"
                startIcon={<FilterList />}
              >
                {filterBy.muscles.length === 0 &&
                filterBy.equipments.length === 0
                  ? "All"
                  : "Filtered"}
              </SortMobileButton>
            </HeaderContainer>
          </Header>
        </>
      ) : (
        //Tablet and above
        <Header>
          <HeaderContainer>
            <Title>Exercises</Title>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              variant="outlined"
              size="small"
              placeholder="Search exercises"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end" onClick={() => setSearch("")}>
                    <IconButtonOrigin iconName="CancelRounded" />
                  </InputAdornment>
                ),
              }}
            />
            <FilterByWrapper>
              <MusclesWrapper>
                <FilterByTitleWrapper>
                  <FilterByTitle>Focus Area</FilterByTitle>
                  <span>
                    (
                    {filterBy.muscles.length === 0
                      ? "All"
                      : filterBy.muscles.length}
                    )
                  </span>
                </FilterByTitleWrapper>
                {muscles.map((muscle: string) => (
                  <Chip
                    variant={isMuscleIncluded(muscle) ? "filled" : "outlined"}
                    key={muscle}
                    label={muscle}
                    onClick={() => {
                      handleMuscle(muscle);
                    }}
                  />
                ))}
              </MusclesWrapper>

              <EquipmentsWrapper>
                <FilterByTitleWrapper>
                  <FilterByTitle>Equipments</FilterByTitle>
                  <span>
                    (
                    {filterBy.equipments.length === 0
                      ? "All"
                      : filterBy.equipments.length}
                    )
                  </span>
                </FilterByTitleWrapper>
                {equipments.map((equipment: Equipment) => (
                  <Chip
                    variant={
                      isEquipmentIncluded(equipment.name)
                        ? "filled"
                        : "outlined"
                    }
                    onClick={() => {
                      handleEquipment(equipment.name);
                    }}
                    key={equipment.name}
                    label={equipment.name}
                  />
                ))}
              </EquipmentsWrapper>
            </FilterByWrapper>
          </HeaderContainer>
        </Header>
      )}
    </>
  );
};
export default ExerciseHeader;
