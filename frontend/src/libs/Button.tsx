import { Button as MuiButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(MuiButton)`
  font-weight: 600;
  /* text */
  &.MuiButton-text {
    color: var(--component-button-primary);
    background-color: var(--core-transparent);
    &:hover {
      background-color: var(--component-button-primary-active);
    }
    &:disabled {
      opacity: var(--system-opacity-disabled);
    }
  }

  /* contained */
  &.MuiButton-contained {
    color: var(--core-whiteness);
    background-color: var(--component-button-primary);
    &:hover {
      background-color: var(--component-button-primary-contained-hover);
    }
    &:disabled {
      opacity: var(--system-opacity-disabled);
    }
  }

  /* outlined */
  &.MuiButton-outlined {
    color: var(--component-button-primary);
    border: 2px solid var(--component-button-primary-border);
    border-radius: unset;
    &:hover {
      background-color: var(--component-button-primary);
      color: #fff;
      border: 2px solid var(--component-button-primary-border);
    }
    &:disabled {
      opacity: var(--system-opacity-disabled);
    }
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const Button: React.FC<ButtonProps> = ({ sx, ...props }) => (
  <CustomButton sx={sx as any} {...props} />
);

export default Button;
