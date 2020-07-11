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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  navShift: {
    marginTop: 30,
  },
  firstRow: {
    paddingRight: 20,
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

const Assets = ({ openBar, setTitle }) => {
  useEffect(() => {
    setTitle('Assets');
    openBar();

    // eslint-disable-next-line
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    //getAssets();
  };
  const addAsset = () => {
    setOpen(true);
  };

  console.log(open);
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.navShift}>
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
      <Grid item>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant='h5' component='h2'>
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              adjective
            </Typography>
            <Typography variant='body2' component='p'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <AddAsset open={open} handleClose={() => handleClose()} />
    </Grid>
  );
};

Assets.propTypes = {
  openBar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});
export default connect(mapStateToProps, {
  openBar,
  setTitle,
})(Assets);
