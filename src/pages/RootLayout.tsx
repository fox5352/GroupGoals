import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import type { User } from "firebase/auth";

export default function RootLayout({ user }: { user: User | null }) {
  return (
    <>
      <Header user={user} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
