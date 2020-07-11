import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAsset, setCurrent } from '../../../actions/assetActions';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      borderColor: '#FFFFFF',
      cursor: 'pointer',
    },
    minWidth: 275,

    borderWidth: 1,
    borderColor: '#7e57c2',
    borderStyle: 'solid',
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
  avatar: {
    backgroundColor: '#f50057',
  },
});

const AssetCard = ({ asset, deleteAsset, setCurrent, setEditOpen }) => {
  const classes = useStyles();
  let type;
  let icon;

  switch (asset.type) {
    case '10':
      type = 'Cash Deposit';
      icon = <CreditCardIcon />;
      break;
    case '20':
      type = 'Long Term Deposit';
      icon = <AccountBalanceWalletIcon />;
      break;
    case '30':
      type = 'Equities';
      icon = <ShowChartIcon />;
      break;
    case '40':
      type = 'Real Estate';
      icon = <HomeWorkIcon />;
      break;
    default:
      console.log('Something went wrong!');
  }

  const deleteAction = () => {
    deleteAsset(asset._id);
  };

  const setToEdit = () => {
    setCurrent(asset);
    setEditOpen();
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <IconButton aria-label='settings' onClick={setToEdit}>
            <Avatar aria-label='icon' className={classes.avatar}>
              {icon}
            </Avatar>
          </IconButton>
        }
        action={
          <Tooltip title='Delete'>
            <IconButton aria-label='settings' onClick={deleteAction}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
        title={asset.name}
        subheader={type}
      />

      <CardContent onClick={setToEdit}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Amount: ${asset.amount}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Return: {asset.returnValue}%
        </Typography>
      </CardContent>
    </Card>
  );
};

AssetCard.propTypes = {
  asset: PropTypes.object.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setEditOpen: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deleteAsset, setCurrent })(AssetCard);
