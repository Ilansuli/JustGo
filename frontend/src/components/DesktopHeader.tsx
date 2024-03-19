import styled from "@emotion/styled";
import {
  Container as ContainerOrigin,
  IconButton,
  Link as LinkOrigin,
} from "../libs";
import { ReactComponent as Logo } from "../assets/logos/logo.svg";
import { useEffect, useState } from "react";

const Wrapper = styled.header`
  display: none;
  @media (min-width: 700px) {
    display: block;
    background: var(--component-main-header-background);
    position: sticky;
    top: 0;
    z-index: var(--core-z-index-sticky);
    backdrop-filter: var(--core-blur-10);
  }
`;

const Container = styled(ContainerOrigin)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--core-spacing-xxs);
  padding-block: var(--core-spacing-xxxs);
`;

const Nav = styled.nav`
  display: flex;
  gap: var(--core-spacing-large);
`;

const UserList = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--core-spacing-mini);
`;

const UserListItem = styled.li`
  @media (min-width: 450px) {
    display: list-item;
  }
`;

const Link = styled(LinkOrigin)`
  font-weight: var(--core-font-weight-semibold);
  color: inherit;
  text-decoration: none;
  &::after {
    margin-block-start: var(--core-spacing-micro);
    background-color: var(--component-button-primary);
    content: "";
    display: block;
    height: 2px;
    transition: width 0.5s;
    width: 0;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

type MainHeaderProps = {};

const MainHeader: React.FC<MainHeaderProps> = ({}) => {
  //user's preferred theme
  useEffect(() => {
    document.documentElement.dataset.theme ??=
      localStorage.getItem("theme") ?? "auto";
  }, []);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "auto");
  const themeIcon =
    theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "LightModeOutlined"
        : "DarkModeOutlined"
      : theme === "dark"
      ? "LightModeOutlined"
      : "DarkModeOutlined";
  return (
    <Wrapper>
      <Container>
        <Nav>
          <Logo />
          <UserList>
            <UserListItem>
              <Link to="/training">Training</Link>
            </UserListItem>
            <UserListItem>
              <Link to="/custom-training">Custom</Link>
            </UserListItem>
            <UserListItem>
              <Link to="/exercises">Exercises</Link>
            </UserListItem>
            <UserListItem>
              <Link to="/report">Report</Link>
            </UserListItem>
            <UserListItem>
              <Link to="/user">Me</Link>
            </UserListItem>
          </UserList>
        </Nav>
        <IconButton
          iconName={themeIcon}
          title={`Turn ${
            themeIcon === "LightModeOutlined" ? "on" : "off"
          } the light`}
          onClick={() => {
            setTheme((theme) => {
              const newTheme =
                theme === "auto"
                  ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "light"
                    : "dark"
                  : theme === "dark"
                  ? "light"
                  : "dark";
              document.documentElement.dataset.theme = newTheme;
              localStorage.setItem("theme", newTheme);
              return newTheme;
            });
          }}
        />
      </Container>
    </Wrapper>
  );
};
export default MainHeader;
