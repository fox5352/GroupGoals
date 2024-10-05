import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Header from "./components/Header";

// routes
import { Home } from "./routes/Home";

import "./App.css";

// ---------------------------------------------------------------- header component ----------------------------------------------------------------

function App() {
  return (
    <Router>
      {/* TODO: add header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* TODO: add footer */}
    </Router>
  );
}

export default App;
