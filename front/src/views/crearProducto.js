import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormGroup, Icon, Paper } from '@material-ui/core';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const CrearProducto = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [nombre, setNombre] = useState("")
  const [imagen, setImagen] = useState("")
  const [precio, setPrecio] = useState(0)
  const [descripcion, setDescripcion] = useState("")

  // true es la de success
  const [alertType, setAlertType] = useState(true);


  function clearFields() {
    setNombre("")
    setImagen("")
    setPrecio(0)
    setDescripcion("")
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:3001/api/crearProducto', {
      nombreProducto: nombre,
      imagen: imagen,
      precio: precio,
      descripcion: descripcion
    })
    .then(function (response) {
      setAlertType(true)
      setOpen(true)
      console.log(response);
    })
    .catch(function (error) {
      setAlertType(false)
      setOpen(true)
      console.log(error);
    });
    e.target.reset();
    clearFields();
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Agrega tu producto 🍕
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nombre del producto"
                autoFocus
                onChange={e => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Link de la imagen"
                onChange={e => setImagen(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                variant="outlined" 
                required fullWidth label="Descripción" />
            </Grid>
    

            <Grid item xs={12} sm={6}>
              <TextField type="number" 
                inputProps={{ min: 1, max: 10 }} 
                variant="outlined" 
                onChange={e => 
                  {setPrecio(e.target.value); 
                  }} 
                required fullWidth 
                label="Precio" />
            </Grid>

            
          </Grid>
          <br/>
          <Button
            type="submit"
            size="large"
            style={{ margin: '0 auto', display: 'flex', borderRadius: '5px' }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Agregar producto
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            
            {alertType
              ? <Alert onClose={handleClose} severity="success" sx={{ width: '98vw' }}>
                  Producto creado exitosamente! 🔥
                </Alert>
              : <Alert onClose={handleClose} severity="error" sx={{ width: '98vw' }}>
                  Error al crear producto 💀
                </Alert>
            }
          </Snackbar>
        </form>
      </Paper>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
};

export default CrearProducto;
