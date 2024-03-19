import * as Icons from "@mui/icons-material";
import { styled } from "@mui/system";
import { IconButtonProps, IconButton as MuiIconButton } from "@mui/material";

type CustomIconButtonProps = {
  iconName: keyof typeof Icons;
} & IconButtonProps;

const CustomIconButton = styled(MuiIconButton)`
  .MuiSvgIcon-root {
    color: var(--system-common-body);
  }
  // Click background animation
  & .MuiTouchRipple-root {
    color: var(--system-common-body);
  }
  &:hover {
    background-color: var(--component-button-primary-active);
  }
`;

const IconButton: React.FC<CustomIconButtonProps> = ({
  iconName,
  // There's an issue with `sx` in the current version of @mui/material
  sx,
  ...props
}) => {
  const IconComponent = Icons[iconName];

  return (
    <CustomIconButton sx={sx as any} {...props}>
      <IconComponent />
    </CustomIconButton>
  );
};
export default IconButton;
