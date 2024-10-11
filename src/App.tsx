import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./model/fireBase";

// components
import Home from "./pages/Home/Home";

import "./App.css";
import RootLayout from "./pages/RootLayout";

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
          {/* TODO: implement /groups route */}
          {/* TODO: implement /settings route*/}

          {/* TODO: implement 404 page */}
          <Route path="*" element={<h1>Route Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

// function Protected({user, children}) {

// }

export default App;
