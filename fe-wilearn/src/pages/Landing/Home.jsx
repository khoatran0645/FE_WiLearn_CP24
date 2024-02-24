import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Navbarmenu from "../../components/Nabar/Navbarmenu";

const Home = () => {
  return (
    <>
      <Navbarmenu/>
      <Sidebar
        collapsed={false}
        rootStyles={{
          backgroundColor: '#195cee',
        }}
      >
        <Menu closeOnClick={true}>
          <MenuItem component={<Link to="/" />}>Members</MenuItem>
          <MenuItem component={<Link to="/" />}>Discussion</MenuItem>
          <MenuItem component={<Link to="/" />}>Schedule</MenuItem>
          <MenuItem component={<Link to="/" />}>Study Documents</MenuItem>
          <MenuItem component={<Link to="/" />}>Statistics</MenuItem>
          <MenuItem component={<Link to="/" />}>Settings</MenuItem>
        </Menu>
      </Sidebar>
      </>
  );
};

export default Home;
