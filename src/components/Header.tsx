import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  handleLogOut,
  handleSignIn,
  getSignInResult,
} from "../model/fireBase";
import type { User } from "firebase/auth";

import LabelBottomNavigation from "./LabelBottomNavigation";

import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";

import theme from "../theme";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getSignInResult();
        if (result && result.user) {
          console.log("Redirect result user:", result.user);
          setUser(result.user);
        } else {
          console.log("No redirect result");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
        if (error instanceof Error) {
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);
        }
      }
    };

    handleRedirectResult();

    const subscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });

    return () => {
      subscribe();
      setUser(null);
    };
  }, []);

  const handUserAuth = async () => {
    if (!isLoading && !user) {
      setIsLoading(true);
      await handleSignIn();
      setIsLoading(false);
    } else {
      await handleLogOut();
    }
  };

  return (
    <>
      <header>
        {/* <h2 className={styles.title}>Group-Goal's</h2> */}
        {/* TODO: desktop navigation */}
        {/* <nav>{!user ? <SignInButton /> : <LogOutButton />}</nav> */}
        <Box sx={{ flexGrow: 1 }} color="secondary">
          <AppBar
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
            }}
            position="static"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: 1260,
                width: "100%",
                marginX: "auto",
              }}
            >
              {/* LOGO */}
              <Typography
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  px: 0.6,
                }}
              >
                Group Goal's
              </Typography>
              {/* top nav bar */}
              <Box sx={{ display: "flex" }}>
                <IconButton onClick={handUserAuth}>
                  {!user ? (
                    <Login color="primary" />
                  ) : (
                    <Logout color="secondary" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </AppBar>
        </Box>

        {/* mobile navigation */}
        <LabelBottomNavigation />
      </header>
    </>
  );
}
