import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import InputMaterial from '../Inputs/Material'
import ButtonSimples from '../Button/Simples'
import axios from 'axios'
import { api, versao } from '../../config';
import errorHandling from "../../actions/errorHandling";
import { saveToken, getHeaders, cleanToken } from '../../actions/localStorage';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });


  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal({ titulo, descricao, onClick, onChange, inep }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const dados = { inep, password }
  const handleUpdate = () => {
    axios.put(`${api}/api/${versao}/usuarios/`, dados, getHeaders())
      .then((response) => console.log(response)
      )
      .catch((error) => errorHandling(error));

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{titulo}</h2>
            <p id="spring-modal-description">{descricao}</p>
            <InputMaterial
              label='Senha nova'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <ButtonSimples
              label='Criar'
              type='acessar'
              onClick={handleUpdate}

            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}