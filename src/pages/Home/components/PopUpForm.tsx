import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { CheckCircle, CloseRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useUser } from "../../../state/UserProvider";
import { useSnackMessage } from "../../../components/SnackBar";
import { createBoard } from "../../../model/fireStore";
type BoardFormType = {
  name: string;
  userId: string;
  colabs: Array<string>;
};

function PopUpForm({ open, onClick }: { open: boolean; onClick: () => void }) {
  const [error, setError] = useState(false);
  const [boardForm, setBoardForm] = useState<BoardFormType>({
    name: "",
    userId: "",
    colabs: [],
  });
  const { sendMessage } = useSnackMessage();
  const { user } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, [e.target.name]: e.target.value });
  };

  const submitBoard = () => {
    if (user === null || boardForm.name.trim() === "") {
      sendMessage({
        message: "User is required to be logged in",
        variant: "error",
      });
      setError(true);
      return;
    }
    // Add board to firebase here)
    createBoard(boardForm.name, user.uid, [])
      .then(() => {
        // Set boardForm back to initial state
        setBoardForm({ name: "", userId: "", colabs: [] });
      })
      .catch((error) => {
        sendMessage({
          message: "An error occurred while creating the board",
          variant: "error",
        });
        setError(true);
        console.error("Error creating board:", error);
      })
      .finally(() => {
        onClick();
      });
  };

  useEffect(() => {
    setError(() => {
      const allowedPatten = new RegExp(`^[a-zA-Z0-9_]{${3},}$`);
      return !allowedPatten.test(boardForm.name);
    });
  }, [boardForm.name]);

  return (
    <Dialog onClose={onClick} open={open}>
      <DialogTitle sx={{ width: "100%", paddingX: "0.5em" }}>
        <Divider>Board Form</Divider>
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "0.5em" }}
          size="small"
          label="Board Name"
          name="name"
          variant="outlined"
          color="secondary"
          error={error}
          onChange={handleInputChange}
          value={boardForm.name}
        />
      </DialogContent>
      <DialogActions>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            minWidth: "215px",
          }}
          direction="row"
        >
          <Chip
            variant="outlined"
            label="close"
            color="error"
            icon={<CloseRounded />}
            onClick={onClick}
          />
          <Chip
            disabled={error}
            variant="filled"
            label="Add"
            color="success"
            icon={<CheckCircle />}
            onClick={submitBoard}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default PopUpForm;
