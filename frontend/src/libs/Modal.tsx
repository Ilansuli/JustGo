import styled from "@emotion/styled";
import { Modal as MuiModal, ModalProps, Box as MuiBox } from "@mui/material";

const StyledModal = styled(MuiModal)``;

const Box = styled(MuiBox)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
  box-shadow: var(--system-common-shadow);
  background-color: var(--system-global-background);
  color: var(--system-global-body);
`;
// There's an issue with `sx` in the current version of @mui/material
const Modal: React.FC<ModalProps> = ({ children, sx, ...props }) => (
  <StyledModal sx={sx as any} {...props}>
    <Box>{children}</Box>
  </StyledModal>
);
export default Modal;
