// avatarSkeletonContainer: {
//     height: 0,
//     overflow: "hidden",
//     paddingTop: "100%",
//     position: "relative"
//   },
//   avatarLoader: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%"
//   },

import styled from "@emotion/styled";
import { Skeleton as MuiSkeleton, SkeletonProps } from "@mui/material";

const Wrapper = styled.div`
  height: 0;
  overflow: hidden;
  padding-block-start: 100%;
`;
const CustomSkeleton = styled(MuiSkeleton)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
// There's an issue with `sx` in the current version of @mui/material
const Skeleton: React.FC<SkeletonProps> = ({ sx, ...props }) => (
  <Wrapper>
    <CustomSkeleton sx={sx as any} {...props} />
  </Wrapper>
);

export default Skeleton;
