
import {
  handleLogOut,
  handleSignIn,
} from "../model/fireBase";

import type { User } from "firebase/auth";

import NavigationBar from "./NavigationBar";

import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";

import theme from "../theme";

export default function Header({user}: {user: User | null}) {

  const handUserAuth = () => {
    if (!user) {
      handleSignIn();
    } else {
      handleLogOut();
    }
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }} color="secondary">
        <AppBar sx={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.background.paper }} position="static">
          {/* Top nav bar */}
          <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: 1260, width: "100%", marginX: "auto" }}>
            {/* LOGO */}
            <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", sm: "1.75rem" }, px: 0.6 }} >
              Group Goal's
            </Typography>
            {/* top nav bar */}
            <Box sx={{ display: "flex" }}>
              <IconButton onClick={handUserAuth}>
                {!user ? (
                  <Login color="primary" />
                ) : 
                    <Logout color="secondary" />}
              </IconButton>
              {/* -------------------------------------------------  ------------------------------------------------- */}
              <NavigationBar sx={{ display: "flex", width: {xs: "100%", md: "auto"}, position: { xs: "fixed",  md: "relative"}, left: {xs: "0", md: "none"}, bottom: {xs: "0", md: "none"} , height: "42px" }} />
            </Box>
          </Box>
        </AppBar>
      </Box>
    </header>
  );
}
