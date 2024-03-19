import styled from "@emotion/styled";
import { Container } from "../libs";

type UserPageProps = {};

const Wrapper = styled.section`
  min-height: 100dvh;
`;

const UserPage: React.FC<UserPageProps> = ({}) => {
  return (
    <Wrapper>
      <Container>NEW PAGE</Container>
    </Wrapper>
  );
};
export default UserPage;
