import React from 'react';
import Spinner from '../layout/Spinner';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser } from '../../actions/userActions';
const PrivateRoute = ({
  isAuthenticated,
  loading,
  loadUser,
  component: Component,
  ...rest
}) => {
  if (!isAuthenticated) {
    loadUser();
    console.log('in private route');
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && !loading ? (
          <Component {...props} />
        ) : !isAuthenticated && loading ? (
          <Spinner />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
