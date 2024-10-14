import { Link, useLocation } from "react-router-dom";

import { Button, Stack } from "@mui/material";
import { Notifications, People } from "@mui/icons-material";

type ButtonType = {
  value: string;
  to: string;
  icon: JSX.Element;
};

function GroupNavBar() {
  const { pathname } = useLocation();
  const buttons: Array<ButtonType> = [
    { value: "groups", to: ".", icon: <People /> },
    { value: "notifi", to: "messages", icon: <Notifications /> },
  ];

  const mapper = ({ value, to, icon }: ButtonType) => {
    const color = pathname.includes(value) ? "secondary" : "primary";

    return (
      <Link to={to}>
        <Button size="small" variant="contained" color={color} startIcon={icon}>
          {value}
        </Button>
      </Link>
    );
  };

  return (
    <Stack sx={{ padding: "3px" }} direction="row" spacing={0.5}>
      {buttons.map(mapper)}
    </Stack>
  );
}

export default GroupNavBar;
