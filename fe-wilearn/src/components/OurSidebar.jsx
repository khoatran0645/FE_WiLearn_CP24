import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import People from "@mui/icons-material/People";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
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
        <MenuItem component={<Link to="member" />} icon={<People />}>Members</MenuItem>
        <MenuItem component={<Link to="discussion" />} icon={<LocalLibraryIcon /> }>Discussion</MenuItem>
        <MenuItem component={<Link to="schedule" />} icon={<CalendarMonthIcon />}>Schedule</MenuItem>
        <MenuItem component={<Link to="docs" />} icon={<UploadFileIcon />}>Study Documents</MenuItem>
        <MenuItem component={<Link to="statistics" />} icon={<EqualizerIcon />}>Statistics</MenuItem>
        <MenuItem component={<Link to="settings" />} icon={<SettingsIcon />}>Settings</MenuItem>
      </Menu>
    </Sidebar>
  );
}
