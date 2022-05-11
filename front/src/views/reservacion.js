import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormGroup, Icon, Paper } from '@material-ui/core';
import axios from 'axios';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
//import ButtonGroup from 'react-bootstrap/ButtonGroup'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        eyap.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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



const Contact = () => {
  const classes = useStyles();
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [horario, setHorario] = useState(0)
  const [fecha, setFecha] = useState(new Date())
  const [personas, setPersonas] = useState(0)
  const [mesa, setMesa] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("hola",fecha)
    axios.post('http://localhost:3001/api/crearReservacion', {
      fecha: fecha,
      horarioDefinido: 1,
      nombreCliente: nombre + " " + apellido,
      numPersonas: personas,
      numMesa: mesa
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Haz tu reservación 🍽
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                autoFocus
                onChange={e => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Apellido"
                onChange={e => setApellido(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Telefono" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" inputProps={{ min: 1, max: 10 }} variant="outlined" onChange={e => {setPersonas(e.target.value); console.log(personas)}} required fullWidth label="Número de personas" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" inputProps={{ min: 1, max: 10 }} variant="outlined" onChange={e => {setMesa(e.target.value); console.log(mesa)}} required fullWidth label="Número de mesa" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" inputProps={{ min: 1, max: 10 }} variant="outlined" onChange={e => {setHorario(e.target.value); console.log(horario)}} required fullWidth label="Horario" />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={5}
                autoComplete="none"
                label="Detalles de la reservación"
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={fecha}
                onChange={(newValue) => {
                  setFecha(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Quiero recibir notificaciones por medio del correo."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="large"
            style={{ margin: '0 auto', display: 'flex', borderRadius: '5px' }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reservar
          </Button>
        </form>
      </Paper>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
};

export default Contact;
