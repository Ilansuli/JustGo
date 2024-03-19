import { Fab as MuiFab, FabProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomFab = styled(MuiFab)`
  color: white;
  background-color: var(--component-fab-primary);
  &:hover {
    background-color: var(--component-fab-primary-hover);
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const Fab: React.FC<FabProps> = ({ sx, ...props }) => (
  <CustomFab sx={sx as any} {...props} />
);

export default Fab;
