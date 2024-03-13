import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";
function OurSidebar() {
  return (
    <Sidebar
      collapsed={false}
      rootStyles={{
        backgroundColor: "#ffffff",
        height: "100vh",
      }}
    >
      <Menu>
        <MenuItem component={<Link to="group" />} icon={<GroupsIcon />}>
          Groups
        </MenuItem>
        <MenuItem
          component={<Link to="discussion" />}
          icon={<LocalLibraryIcon />}
        >
          Discussion
        </MenuItem>
        <MenuItem
          component={<Link to="schedule" />}
          icon={<CalendarMonthIcon />}
        >
          Schedule
        </MenuItem>
        <MenuItem component={<Link to="docs" />} icon={<UploadFileIcon />}>
          Study Documents
        </MenuItem>
        <MenuItem component={<Link to="statistics" />} icon={<EqualizerIcon />}>
          Statistics
        </MenuItem>
        <MenuItem component={<Link to="settings" />} icon={<SettingsIcon />}>
          Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default OurSidebar;
