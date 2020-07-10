import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import ForgotPass from './components/auth/ForgotPass';
import { Provider } from 'react-redux';
import store from './Store';
import { makeStyles } from '@material-ui/core/styles';
import PrivateRoute from './components/routing/PrivateRoute';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import setAuthToken from './utils/setauthtoken';
import Alerts from './components/layout/Alerts';
import ResetPassword from './components/auth/ResetPassword';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#7e57c2',
      dark: '#f50057',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f50057',
      dark: '#7e57c2',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const useStyles = makeStyles((theme) => ({
  barShift: {
    paddingTop: 50,
  },
}));
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Navbar />
            <Alerts />
            <Grid container>
              <Grid item xs={false} sm={2} md={4} />
              <Grid item xs={12} sm={8} md={4} className={classes.barShift}>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute path='/user' component={Home} />
                  <Route exact path='/forgotPassword' component={ForgotPass} />
                  <Route
                    exact
                    path='/reset/:email_token'
                    component={ResetPassword}
                  />
                </Switch>
              </Grid>
              <Grid item xs={false} sm={2} md={4} />
            </Grid>
          </Fragment>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
