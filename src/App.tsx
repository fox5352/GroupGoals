import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./model/fireBase";

// components
import Home from "./pages/Home/Home";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound/NotFound";

// ---------------------------------------------------------------- header component ----------------------------------------------------------------

function App() {
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
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout user={user} />}>
          <Route index element={<Home user={user} />} />
          {/* protected */}
          <Route element={<Protected user={user} />}>
            {/* TODO: implement /groups route */}
            {/* TODO: implement /settings route*/}
          </Route>

          {/* TODO: implement 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Protected({ user }: { user: User | null }) {
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default App;
