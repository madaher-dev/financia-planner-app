import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/userActions';

const Home = ({ openBar, setTitle, loadUser }) => {
  useEffect(() => {
    setTitle('Home');
    openBar();
    loadUser();
    console.log('in home');

    // eslint-disable-next-line
  }, []);

  return (
    <Typography variant='h1'>
      dgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgd
      dgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgd
      dgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgddgfdgfdgdsgdsdgfgd
    </Typography>
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
