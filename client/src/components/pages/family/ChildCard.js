import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';

import ChildCareIcon from '@material-ui/icons/ChildCare';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteChild, setCurrent } from '../../../actions/childActions';
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

const ChildCard = ({ child, deleteChild, setCurrent, setEditOpen }) => {
  const classes = useStyles();

  const deleteAction = () => {
    deleteChild(child._id);
  };

  const setToEdit = () => {
    setCurrent(child);
    setEditOpen();
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.cardTitle,
        }}
        avatar={
          <IconButton aria-label='settings' onClick={setToEdit}>
            <Avatar aria-label='icon' className={classes.avatar}>
              <ChildCareIcon />
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
        title={child.name}
        className={classes.cardHead}
      />

      <CardContent onClick={setToEdit}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Age: {child.age}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Schooling Cost/Year: {child.school}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          University Cost/Year: {child.uni}
        </Typography>
      </CardContent>
    </Card>
  );
};

ChildCard.propTypes = {
  child: PropTypes.object.isRequired,
  deleteChild: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setEditOpen: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deleteChild, setCurrent })(ChildCard);
