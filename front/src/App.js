import React from 'react';
import Menu, {routes} from './components/Menu';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    primary: {
      // Purple and green play nicely together.
      main: '#B2967D',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});



function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <Switch>
          {routes.map((elem) => (
            <Route
              key={elem.ruta}
              exact
              path={elem.ruta}
              component={elem.component}
            />
          ))}
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
