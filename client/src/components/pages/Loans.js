import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { setTitle, openBar } from '../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Loans = ({ openBar, setTitle, loadUser }) => {
  useEffect(() => {
    setTitle('Loans');
    openBar();

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

Loans.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
})(Loans);
