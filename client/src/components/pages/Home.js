import React, { useEffect } from 'react';

import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/userActions';
import { Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Income from './Income';
import Goals from './Goals';
import Family from './Family';
import Loans from './Loans';
import Assets from './Assets';
import Profile from './Profile';

const Home = ({ openBar, setTitle, loadUser, match }) => {
  useEffect(() => {
    loadUser();
    console.log('in home');

    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path={`${match.path}/assets`} component={Assets} />
      <Route exact path={`${match.path}/family`} component={Family} />
      <Route exact path={`${match.path}/goals`} component={Goals} />
      <Route exact path={`${match.path}/income`} component={Income} />
      <Route exact path={`${match.path}/loans`} component={Loans} />
      <Route exact path={`${match.path}/profile`} component={Profile} />
      <Route exact path={`${match.path}/`} component={Menu} />
    </Switch>
  );
};

Home.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  loadUser,
})(Home);
