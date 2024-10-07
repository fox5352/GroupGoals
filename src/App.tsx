import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./model/fireBase";

// components
import Header from "./components/Header";
import Home from "./routes/Home";

import "./App.css";


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
      {/* TODO: add header */}
      <Header  user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* TODO: implement /groups route */}
        {/* TODO: implement /settings route*/}
        {/* TODO: implement 404 page */}
        <Route path="*" element={(<h1>Route Not Found</h1>)} />
      </Routes>
      {/* TODO: add footer */}
    </Router>
  );
}

export default App;
