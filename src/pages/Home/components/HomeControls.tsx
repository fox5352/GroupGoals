import { Chip, Stack } from "@mui/material";
import styles from "./HomeControls.module.css";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import PopUpForm from "./PopUpForm";

export default function HomeControls() {
  const [isAddMenUOpen, setIsAddMenUOpen] = useState(false);

  const toggleDialog = () => {
    setIsAddMenUOpen((prev) => !prev);
  };

  return (
    <>
      <Stack
        sx={{
          paddingY: "0.3rem",
          paddingX: "0.2rem",
          overflowX: "auto",
          width: "100%",
          maxWidth: "525px",
          marginX: "auto",
        }}
        direction="row-reverse"
        spacing={1}
      >
        <Chip
          label="Add"
          onClick={toggleDialog}
          className={styles.chip}
          color="secondary"
          variant="outlined"
          icon={<AddCircle />}
        />
      </Stack>
      {/*  */}
      <PopUpForm onClick={toggleDialog} open={isAddMenUOpen} />
    </>
  );
}
