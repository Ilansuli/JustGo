import styled from "@emotion/styled";
type containerProps = {
  children: React.ReactNode;
  className?: string;
};

const StyledContainer = styled.div<containerProps>`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Container: React.FC<containerProps> = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);
export default Container;
