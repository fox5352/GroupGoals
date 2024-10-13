import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../model/fireBase";

import type { User } from "firebase/auth";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import { SimpleSnackbar, SnackMessageProvider } from "../components/SnackBar";
import { useUser } from "../state/UserProvider";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const { update } = useUser();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (current) => {
      if (current === null) return;
      update(current);
      setUser(current);
    });

    return () => {
      subscribe();
    };
  }, [auth, user]);

  return (
    <>
      <Header user={user} />
      <SnackMessageProvider>
        <SimpleSnackbar />
        <main>
          <Outlet />
        </main>
      </SnackMessageProvider>
    </>
  );
}
