import { styled } from "@mui/system";
import { Link as TanstackLink } from "@tanstack/react-router";

const CustomLink = styled(TanstackLink)`
  text-decoration: none;
`;
//@ts-ignore
const Link = ({ ...props }) => <CustomLink {...props} />;

export default Link;
