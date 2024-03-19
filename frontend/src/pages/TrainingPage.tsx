import styled from "@emotion/styled";
import { Container } from "../libs";

type TrainingPageProps = {};

const Wrapper = styled.section`
  min-height: 100dvh;
`;

const TrainingPage: React.FC<TrainingPageProps> = ({}) => {
  return (
    <Wrapper>
      <Container>NEW PAGE</Container>
    </Wrapper>
  );
};
export default TrainingPage;
