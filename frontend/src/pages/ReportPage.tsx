import styled from "@emotion/styled";
import { Container } from "../libs";

type ReportPageProps = {};

const Wrapper = styled.section`
  min-height: 100dvh;
`;

const ReportPage: React.FC<ReportPageProps> = ({}) => {
  return (
    <Wrapper>
      <Container>NEW PAGE</Container>
    </Wrapper>
  );
};
export default ReportPage;
