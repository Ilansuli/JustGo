import styled from "@emotion/styled";
import {
  BottomNavigation,
  Container,
  IconButton as IconButtonOrigin,
} from "../libs";
import {
  AddCircle,
  BarChart,
  DirectionsRun,
  Face,
  FitnessCenter,
} from "@mui/icons-material";
import { BottomNavigationActionOwnProps } from "@mui/material";

type MobileFooterProps = {};

const Wrapper = styled.section`
  background-color: white;
  //mobile size
  display: block;
  position: sticky;
  bottom: 0;

  // desktop size
  @media (min-width: 700px) {
    display: none;
  }
`;

const MobileFooter: React.FC<MobileFooterProps> = ({}) => {
  const icons: (BottomNavigationActionOwnProps & { path: string })[] = [
    { icon: <DirectionsRun />, label: "Training", path: "/training" },
    { icon: <AddCircle />, label: "Custom", path: "/custom-training" },
    { icon: <FitnessCenter />, label: "Exercises", path: "/exercises" },
    { icon: <BarChart />, label: "Report", path: "/report" },
    { icon: <Face />, label: "Me", path: "/user" },
  ];
  return (
    <Wrapper>
      <Container>
        <BottomNavigation showLabels icons={icons}></BottomNavigation>
      </Container>
    </Wrapper>
  );
};
export default MobileFooter;
