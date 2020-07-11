import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { setTitle, openBar } from '../../../actions/navActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddAsset from './AddAsset';
import EditAsset from './EditAsset';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AssetCard from './AssetCard';

import Spinner from '../../layout/Spinner';
import { getAssets } from '../../../actions/assetActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },

  firstRow: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  icon: {
    paddingRight: 15,
    '&:hover': {
      backgroundColor: '#ee99fc',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Assets = ({ openBar, setTitle, assets, getAssets, loading, current }) => {
  const classes = useStyles();
  useEffect(() => {
    setTitle('Assets');
    openBar();
    getAssets();

    // eslint-disable-next-line
  }, []);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setEditOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    //getAssets();
  };
  const handleEditClose = () => {
    setEditOpen(false);
    //getAssets();
  };
  const handleEditOpen = () => {
    setEditOpen(true);
    //getAssets();
  };
  const addAsset = () => {
    setOpen(true);
  };

  return (
    <Grid container direction='column'>
      <Grid
        item
        container
        justify='flex-end'
        direction='column'
        alignItems='flex-end'
        className={classes.firstRow}
      >
        <IconButton
          edge='start'
          color='primary'
          aria-label='menu'
          className={classes.icon}
          onClick={addAsset}
        >
          <AddCircleOutlineIcon
            style={{ fontSize: 40 }}
            color='secondary'
            className={classes.icon2}
          />
        </IconButton>
        <Typography color='primary'>Add Asset</Typography>
      </Grid>
      <Grid item className={classes.firstRow}>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            {assets !== null && !loading ? (
              <Grid container spacing={2} direction='column'>
                {assets.map((asset) => (
                  //Looping through assets array and list ContactItem Component

                  <Grid item key={asset._id}>
                    <AssetCard
                      asset={asset}
                      setEditOpen={() => handleEditOpen()}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Spinner />
            )}
          </CardContent>
          <CardActions>
            <Button size='small' to='/user' component={Link}>
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <AddAsset open={open} handleClose={() => handleClose()} />
      <EditAsset open={openEdit} handleClose={() => handleEditClose()} />
    </Grid>
  );
};

Assets.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  assets: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  current: PropTypes.object,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  assets: state.assets.assets,
  loading: state.assets.loading,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
  getAssets,
})(Assets);
