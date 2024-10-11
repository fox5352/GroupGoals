import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import theme from "../theme";

interface SnackMessageType {
  message: string;
  variant: string;
}
interface SnackMessageContextType extends SnackMessageType {
  sendMessage: (message: SnackMessageType) => void;
}

type Action = { type: string; payload: SnackMessageType };

const initialState = {
  message: "",
  variant: "warning",
};

const SnackMessageContext = createContext<SnackMessageContextType | undefined>(
  undefined
);

const reducer = (state: SnackMessageType, action: Action): SnackMessageType => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export function SnackMessageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendMessage = (message: SnackMessageType) => {
    dispatch({ type: "SET_MESSAGE", payload: message });
  };

  const value: SnackMessageContextType = {
    message: state.message,
    variant: state.variant,
    sendMessage,
  };

  return (
    <SnackMessageContext.Provider value={value}>
      {children}
    </SnackMessageContext.Provider>
  );
}

export const useSnackMessage = (): SnackMessageContextType => {
  const context = useContext(SnackMessageContext);
  if (context === undefined) {
    throw new Error(
      "useSnackMessage must be used within a SnackMessageProvider"
    );
  }
  return context;
};

export function SimpleSnackbar() {
  const { message, variant } = useSnackMessage();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.contrastText,
  });

  useEffect(() => {
    if (message) {
      const bg =
        variant == "warning"
          ? theme.palette.warning.main
          : theme.palette.error.main;

      setColors((prev) => ({ color: prev.color, backgroundColor: bg }));

      setOpen(true);
    }
  }, [message, variant]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseRounded />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Note archived"
      >
        <SnackbarContent sx={colors} message={message} action={action} />
      </Snackbar>
    </>
  );
}
