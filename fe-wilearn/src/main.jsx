import ReactDOM from "react-dom/client";
import React from "react";
import Router from "./routes/Router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import store from "./app/store.js";
// import { Provider } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google'
const theme = createTheme({
  palette: {
    mode: "light",
    border: {
      red: "red",
      blue: "blue"
    }
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ToastContainer> */}
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="422799108764-meidfkt2ig8vk0280fojs5ifsvmhsp3k.apps.googleusercontent.com">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <CssBaseline />
              <Router />
              <ToastContainer />
            </BrowserRouter>
          </LocalizationProvider>
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
    {/* // </ToastContainer> */}
  </React.StrictMode>
);
