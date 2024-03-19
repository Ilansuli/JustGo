import styled from "@emotion/styled";
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationProps,
  BottomNavigationAction,
  BottomNavigationActionOwnProps,
} from "@mui/material";
import { Link } from ".";

type CustomBottomNavigationProps = {
  icons: (BottomNavigationActionOwnProps & { path: string })[];
} & BottomNavigationProps;

const StyledBottomNavigation = styled(MuiBottomNavigation)`
  //set background in parent cmp's wrapper
  .MuiBottomNavigationAction-root {
    padding: unset;
    min-width: unset;
    &.active {
      color: var(--component-button-primary);
    }
    &.MuiTouchRipple-root {
    }
  }
`;

const BottomNavigation: React.FC<CustomBottomNavigationProps> = ({
  icons,
  sx,
  ...props
}) => (
  // TODO : there's a ref err that cannot be forwarded like this , need to use forwardRef(check console errs)
  <StyledBottomNavigation sx={sx as any} {...props}>
    {icons.map(({ icon, label, path }) => (
      <BottomNavigationAction
        component={Link}
        to={path}
        label={label}
        icon={icon}
        key={path}
      ></BottomNavigationAction>
    ))}
  </StyledBottomNavigation>
);
export default BottomNavigation;
