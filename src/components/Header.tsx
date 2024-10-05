import { useEffect, useState } from "react";
import { SignInButton, LogOutButton } from "./AuthButtons";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../model/fireBase";

import type { User } from "firebase/auth";

import styles from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
    return () => {
      subscribe();
      setUser(null);
    };
  }, []);

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Group-Goal's</h2>
      <BasicMenu />
      {/* <nav className={}>{!user ? <SignInButton /> : <LogOutButton />}</nav> */}
    </header>
  );
}

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent } from "react";
// import {} fr

export function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <MenuIcon /> */}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
