import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomTextField = styled(MuiTextField)`
  /* Label */
  .MuiInputLabel-root:not(.Mui-error) {
    color: var(--system-common-body);
  }
  .MuiInputLabel-root.Mui-focused:not(.Mui-error) {
    color: var(--component-text-field-primary);
  }
  .MuiInputLabel-root.Mui-disabled {
    color: var(--system-common-body);
    opacity: var(--system-opacity-disabled);
  }

  /* Helper Text */
  .MuiFormHelperText-root {
    color: var(--system-common-body);
  }
  .MuiFormHelperText-root.Mui-disabled {
    color: var(--system-common-body);
    opacity: var(--system-opacity-disabled);
  }

  /* Select Icon */
  .MuiSelect-icon {
    color: var(--system-common-body);
  }

  .MuiInputAdornment-root {
    color: var(--system-common-body_05);
  }

  /* Outlined Input */
  .MuiInputBase-root.MuiOutlinedInput-root {
    color: var(--system-common-body);

    &:not(.Mui-error) .MuiOutlinedInput-notchedOutline {
      border-color: var(--system-common-body_05);
    }
    &:not(.Mui-disabled).Mui-focused:not(.Mui-error)
      .MuiOutlinedInput-notchedOutline {
      border-color: var(--component-text-field-primary);
    }
    &:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)
      .MuiOutlinedInput-notchedOutline {
      border-color: var(--system-common-body);
    }
    &.Mui-disabled {
      opacity: var(--system-opacity-disabled);
    }
    .Mui-disabled {
      -webkit-text-fill-color: var(--system-common-body);
    }
  }

  /* Filled Input */
  .MuiInputBase-root.MuiFilledInput-root {
    color: var(--system-common-body);
    background-color: var(--system-common-body_01);
    &:hover:not(.Mui-focused):not(.Mui-disabled) {
      color: var(--system-common-body);
      background-color: var(--system-common-body_03);
    }
    &:not(.Mui-error)::before {
      border-bottom: 1px solid var(--system-common-body_05);
    }
    &:hover:not(.Mui-disabled):not(.Mui-error)::before {
      border-bottom: 1px solid var(--system-common-body);
    }
    &:not(.Mui-error)::after {
      border-bottom: 2px solid var(--component-text-field-primary);
    }
    &.Mui-disabled {
      opacity: var(--system-opacity-disabled);
    }
    .Mui-disabled {
      -webkit-text-fill-color: var(--system-common-body);
    }
  }

  /* Standard Input */
  .MuiInputBase-root.MuiInput-underline {
    color: var(--system-common-body);
    &:not(.Mui-error)::before {
      border-bottom: 1px solid var(--system-common-body_05);
    }
    &:hover:not(.Mui-disabled):not(.Mui-error)::before {
      border-bottom: 1px solid var(--system-common-body);
    }
    &:not(.Mui-error)::after {
      border-bottom: 2px solid var(--component-text-field-primary);
    }
    &.Mui-disabled {
      opacity: var(--system-opacity-disabled);
    }
    .Mui-disabled {
      -webkit-text-fill-color: var(--system-common-body);
    }
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const TextField: React.FC<TextFieldProps> = ({ sx, ...props }) => (
  <CustomTextField sx={sx as any} {...props} />
);

export default TextField;
