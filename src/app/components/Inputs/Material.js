import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function BasicTextFields({ label, onChange, value, validate, textValidate }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div style={{ backgroundColor: validate === false ? '#ff000061' : '#0080007a', color: 'white' }}>
        <span >{textValidate}</span>
      </div>

      <TextField id="outlined-basic" value={value} onChange={onChange} label={label} variant="outlined" />
    </form>
  );
}