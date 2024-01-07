import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          outline: 'none'
        }
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    htmlFontSize: 10
  },
  palette: {
    primary: {
      main: '#1e90ff'
    },
    secondary: {
      main: '#6C707B'
    },
    background: {
      main: '#F0ECE6'
    },
    darkGreen: {
      main: '#3C6761'
    },
    bodyText: {
      main: '#043730'
    }
  }
});

export default theme;
