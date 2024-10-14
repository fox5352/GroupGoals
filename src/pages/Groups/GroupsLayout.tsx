import { Outlet } from "react-router-dom";
import GroupNavBar from "./components/GroupNavBar";

function GroupsLayout() {
  return (
    <>
      <GroupNavBar />
      <Outlet />
    </>
  );
}

export default GroupsLayout;
