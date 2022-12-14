import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from '../../theme';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';

const App = ({ isLoading, children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <React.Fragment>
            <CssBaseline />
            <div
              className={classnames('App__Container', {
                'App__Container--isLoading': isLoading,
              })}
            >
              {children}
            </div>

            <div
              className={classnames('App__LoadingOverlay', {
                'App__LoadingOverlay--hidden': !isLoading,
                'App__LoadingOverlay--visible': isLoading,
              })}
            />
          </React.Fragment>
        </DndProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

App.defaultProps = {
  isLoading: false,
};

App.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default App;
