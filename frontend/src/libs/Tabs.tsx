import { Tabs as MuiTabs, TabsProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomTabs = styled(MuiTabs)`
  .MuiTab-root {
    color: var(--system-global-body);
    &.Mui-selected {
      color: var(--component-tab-selected);
    }
    .MuiTouchRipple-root {
      /* background-color: white; */
    }
  }
`;

// There's an issue with `sx` in the current version of @mui/material
const Tabs: React.FC<TabsProps> = ({ sx, ...props }) => (
  <CustomTabs
    sx={sx as any}
    {...props}
    TabIndicatorProps={{
      style: {
        backgroundColor: "var(--component-tab-selected)",
      },
    }}
  />
);

export default Tabs;
