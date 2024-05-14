import { styled } from "@mui/system";
import { Link as TanstackLink, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";

const CustomLink = styled(TanstackLink)`
  text-decoration: none;
`;
const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <CustomLink {...props} ref={ref as any} />
));

export default Link;
