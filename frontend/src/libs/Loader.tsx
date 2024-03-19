import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
} from "@mui/material";
import { height, styled } from "@mui/system";
import { Container as ContainerOrigin } from "./";

type ContainerProps = { height: string };
const Container = styled(ContainerOrigin)<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => props.height};
`;
const CustomLoader = styled(MuiCircularProgress)`
  &.MuiCircularProgress-root {
    color: var(--component-loader-primary);
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const Card: React.FC<CircularProgressProps & { height: string }> = ({
  sx,
  height,
  ...props
}) => (
  <Container height={height}>
    <CustomLoader sx={sx as any} {...props} />
  </Container>
);

export default Card;
