import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");
  const router = useNavigate();

  const map: Record<string, string> = {
    home: "/",
    groups: "/groups",
    settings: "/settings",
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("event", event);
    setValue(newValue);
    router(map[newValue]);
  };

  return (
    <BottomNavigation
      sx={{
        display: { sm: "flex", md: "none" },
        justifyContent: "space-evenly",
        width: "100%",
        position: "fixed",
        bottom: "0",
        left: "0",
        backgroundColor: theme.palette.background.paper,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Groups"
        value="groups"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
