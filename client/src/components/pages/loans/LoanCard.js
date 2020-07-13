import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import HistoryIcon from '@material-ui/icons/History';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLoan, setCurrent } from '../../../actions/loanActions';
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
  cardHead: {
    backgroundColor: '#7e57c2',
  },
  delete: {
    color: '#e0e0e0',
  },
  cardTitle: {
    color: '#e0e0e0',
    fontSize: 18,
  },
});

const LoanCard = ({ loan, deleteLoan, setCurrent, setEditOpen }) => {
  const classes = useStyles();

  const deleteAction = () => {
    deleteLoan(loan._id);
  };

  const setToEdit = () => {
    setCurrent(loan);
    setEditOpen();
  };

  let maturityDate = new Date(loan.maturity);

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.cardTitle,
        }}
        avatar={
          <IconButton aria-label='settings' onClick={setToEdit}>
            <Avatar aria-label='icon' className={classes.avatar}>
              <HistoryIcon />
            </Avatar>
          </IconButton>
        }
        action={
          <Tooltip title='Delete'>
            <IconButton
              aria-label='settings'
              onClick={deleteAction}
              className={classes.delete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
        title={loan.name}
        className={classes.cardHead}
      />

      <CardContent onClick={setToEdit}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Amount: ${loan.amount}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Interest Rate : {loan.interest}%
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Maturity Year : {maturityDate.getFullYear()}
        </Typography>
      </CardContent>
    </Card>
  );
};

LoanCard.propTypes = {
  loan: PropTypes.object.isRequired,
  deleteLoan: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setEditOpen: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deleteLoan, setCurrent })(LoanCard);
