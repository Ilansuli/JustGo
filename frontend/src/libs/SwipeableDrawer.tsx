import {
  SwipeableDrawer as MuiSwipeableDrawer,
  SwipeableDrawerProps,
} from "@mui/material";
import { styled } from "@mui/system";
import Container from "./Container";

const CustomSwipeableDrawer = styled(MuiSwipeableDrawer)`
  .MuiDrawer-paper {
    background: var(--system-global-background);
    color: var(--system-common-body);
    box-shadow: var(--system-common-shadow);
  }
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
