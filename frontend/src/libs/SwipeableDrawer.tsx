import {
  SwipeableDrawer as MuiSwipeableDrawer,
  SwipeableDrawerProps,
} from "@mui/material";
import { styled } from "@mui/system";
import ContainerOrigin from "./Container";

const CustomSwipeableDrawer = styled(MuiSwipeableDrawer)`
  .MuiDrawer-paper {
    background: var(--system-global-background);
    color: var(--system-common-body);
    box-shadow: var(--system-common-shadow);
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

const Container = styled(ContainerOrigin)`
  height: 100%;
`;
// There's an issue with `sx` in the current version of @mui/material
const SwipeableDrawer: React.FC<SwipeableDrawerProps> = ({
  sx,
  children,
  ...props
}) => (
  <CustomSwipeableDrawer sx={sx as any} {...props}>
    <Container>{children}</Container>
  </CustomSwipeableDrawer>
);

export default SwipeableDrawer;
