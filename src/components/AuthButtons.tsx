import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../model/fireBase";

export function SignInButton() {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      console.log("Signed in successfully", result.user);
    } catch (error) {
      console.error("Error signing in :", error);
    }
  };

  return <button onClick={handleSignIn}>sign in</button>;
}

export function LogOutButton() {
  const handleLogOut = async () => {
    try {
      await signOut(auth);

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return <button onClick={handleLogOut}>Log Out</button>;
}
