import { User } from "firebase/auth";
import { useContext, createContext, useReducer, ReactNode } from "react";

interface UserType {
  user: User | null;
}

// Create a new interface that combines UserType with our custom properties
interface ExtendedUser extends UserType {
  update: (user: User) => void;
  isValid: () => boolean;
}

type Action = { type: string; payload: unknown };

const UserContext = createContext<ExtendedUser | null>(null);

const initialState: UserType = { user: null };

const reducer = (state: UserType, action: Action): UserType => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload as User };
    default:
      return state;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const update = (user: User) => {
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  const isValid = () => {
    return state.user !== null;
  };

  const value: ExtendedUser = {
    user: state.user,
    update,
    isValid,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
