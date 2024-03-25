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

const theme = createTheme({
  palette: {
    mode: "light",
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>

    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <CssBaseline />
          <Router />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
