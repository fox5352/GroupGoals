import type { User } from "firebase/auth";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import { SimpleSnackbar, SnackMessageProvider } from "../components/SnackBar";

export default function RootLayout({ user }: { user: User | null }) {
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
