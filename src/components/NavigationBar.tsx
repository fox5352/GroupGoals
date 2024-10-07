import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../theme";
import { Home, People, Settings } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";

export default function NavigationBar({ sx }: { sx: SxProps<Theme> }) {
  const [value, setValue] = React.useState("home");
  const router = useNavigate();
  const {pathname} = useLocation();

  const map: Record<string, string> = {
    home: "/",
    groups: "/groups",
    settings: "/settings",
  };

  React.useEffect(() => {
    console.log(pathname);
    for (const [key, value] of Object.entries(map)) {
      if (pathname === value) {
        setValue(key);
      }
    }
  
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("event", event);
    setValue(newValue);
    router(map[newValue]);
  };

  return (
    <BottomNavigation sx={sx} value={value} onChange={handleChange}>
      <BottomNavigationAction
        sx={{ color: theme.palette.secondary.main }}
        label="Home"
        value="home"
        icon={<Home />}
      />
      <BottomNavigationAction
        sx={{ color: theme.palette.secondary.main }}
        label="Groups"
        value="groups"
        icon={<People />}
      />
      <BottomNavigationAction
        sx={{ color: theme.palette.secondary.main }}
        label="Settings"
        value="settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}
