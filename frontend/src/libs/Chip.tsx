import { Chip as MuiChip, ChipProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomChip = styled(MuiChip)`
  &.MuiChip-root {
    color: var(--system-common-body);
    transition: all 0.2s;
    margin-inline: 0.2rem;
    margin-block: 0.1rem;
    svg {
      fill: var(--system-global-body);
    }
    .MuiChip-label {
    }
    &.MuiChip-filled {
      background-color: var(--component-chip-primary);
      color: var(--system-common-secondary);
      svg {
        * {
          fill: var(--system-common-secondary);
        }
      }
    }
    &.MuiChip-outlined {
      border-color: var(--component-chip-primary);
    }
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const Chip: React.FC<ChipProps> = ({ sx, ...props }) => (
  <CustomChip sx={sx as any} {...props} />
);

export default Chip;
