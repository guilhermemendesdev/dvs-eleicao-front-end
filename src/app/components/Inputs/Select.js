import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default ({ value, name, opcoes, onChange, classes = useStyles(), error }) => (

    <div>

        <FormControl className={classes.formControl}>
            <Select
                className='input-select'
                value={value}
                name={name}
                onChange={onChange}
            >
                {
                    opcoes.map((opcao, idx) => (
                        <MenuItem key={idx} value={opcao.value}>{opcao.label}</MenuItem>
                    ))
                }
            </Select>
            {error && (<small className='small-danger'>{error}</small>)}
        </FormControl>
    </div >
)