import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#C6D4D9',
      main: '#A9BEC5',
      dark: '#47626B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62a8de',
      main: '#3F6E91',
      dark: '#29475e',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Ruluko', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ','
    ),
    fontSize: 18,
    title1: {
      fontFamily: ['ZCool', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
        ','
      ),
    },
  },
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        dotActive: {
          backgroundColor: '#47626B',
        },
      },
    },
  },
});

export default theme;
