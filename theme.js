import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2239',
      main2: '#AFC1D6',
      light: '#1B5993',
      light2: '#DCE7EA',
      dark: '#030D16',
      dark2: '#7D99BA',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FE5F55',
      contrastText: '#000000',
    },
    red: {
      light: '#ffebee',
    },
    green: {
      light: '#e8f5e9',
    },
    blue: {
      light: '#e3f2fd',
    },
    yellow: {
      light: '#fffed1',
    },
  },
  typography: {
    fontFamily: ['Lato', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ','
    ),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
