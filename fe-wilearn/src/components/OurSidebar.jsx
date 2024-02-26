import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
export default function OurSidebar() {
  return (
    <Sidebar
      collapsed={false}
      rootStyles={{
        backgroundColor: "#195cee",
        height: "100vh",
      }}
    >
      <Menu>
        <MenuItem component={<Link to="/" />}>Members</MenuItem>
        <MenuItem component={<Link to="/" />}>Discussion</MenuItem>
        <MenuItem component={<Link to="/" />}>Schedule</MenuItem>
        <MenuItem component={<Link to="/" />}>Study Documents</MenuItem>
        <MenuItem component={<Link to="/" />}>Statistics</MenuItem>
        <MenuItem component={<Link to="/" />}>Settings</MenuItem>
      </Menu>
    </Sidebar>
  );
}
