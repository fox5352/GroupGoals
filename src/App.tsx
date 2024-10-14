import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import { UserProvider, useUser } from "./state/UserProvider";

// components
import Home from "./pages/Home/Home";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound/NotFound";
import GroupsLayout from "./pages/Groups/GroupsLayout";

// ---------------------------------------------------------------- header component ----------------------------------------------------------------

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            {/* protected */}
            <Route element={<Protected />}>
              <Route path="groups" element={<GroupsLayout />}></Route>
              {/* TODO: implement /settings route*/}
            </Route>

            {/* TODO: implement 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

function Protected() {
  const { user } = useUser();

  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default App;
