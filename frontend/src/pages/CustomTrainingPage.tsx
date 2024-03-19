import styled from "@emotion/styled";
import { Container } from "../libs";

type CustomTrainingPageProps = {};

const Wrapper = styled.section`
  min-height: 100dvh;
`;

const CustomTrainingPage: React.FC<CustomTrainingPageProps> = ({}) => {
  return (
    <Wrapper>
      <Container>NEW PAGE</Container>
    </Wrapper>
  );
};
export default CustomTrainingPage;
