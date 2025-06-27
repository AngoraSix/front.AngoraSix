import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#030D16', // rgb(3, 13, 22)
      main: '#0A2239', //rgb(10, 34, 57)
      lighterBg: '#0F2F4D', // rgb(15, 47, 77)
      light: '#1B5993', // rgb(27, 89, 147)
      contrastText: '#ffffff', // rgb(255, 255, 255)
    },
    primaryWithBlackContrast: {
      dark: '#7D99BA', // rgb(125, 153, 186)
      main: '#AFC1D6', // rgb(175, 193, 214)
      light: '#DCE7EA', // rgb(220, 231, 234)
      contrastText: '#000000', // rgb(0, 0, 0)
    },
    secondary: {
      main: '#FE5F55', // rgb(254, 95, 85)
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
