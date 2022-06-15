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
import HOUR_GROUP from '../config/constants/horas.js'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [fecha, setFecha] = useState(new Date())
  const [personas, setPersonas] = useState(0)
  const [mesa, setMesa] = useState('')
  const [open, setOpen] = useState(false);

  // true es la de success
  const [alertType, setAlertType] = useState(false);

  const [horario, setHorario] = React.useState('');

  const handleChange = (event) => {
    setHorario(event.target.value);
  };

  let dia = fecha.getDate() <= 9 ? "0" + fecha.getDate() : fecha.getDate();
  let mes = fecha.getMonth() + 1 <= 9 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1
  let año = fecha.getFullYear()
  //console.log("dia",mes)
  var fecha_string = año + "-" + mes + "-" + dia 

  function clearFields() {
    setNombre("")
    setApellido("")
    setFecha(new Date())
    setPersonas(0)
    setMesa(0)
    setHorario('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    //console.log(fecha.getDay())
    //console.log("fecha string", fecha_string)
    var today = new Date().toISOString().split('T')[0]
    console.log('Fecha Today: ', today);
    console.log('Fecha res: ', fecha_string);
    console.log('Fecha atras?: ', fecha_string < today);

    axios.post('https://modenese-server.herokuapp.com/api/crearReservacion', {
      fecha: fecha_string,
      horarioDefinido: horario,
      nombreCliente: nombre + " " + apellido,
      numPersonas: personas,
      numMesa: mesa
    })
    .then(function (response) {
      setAlertType(true)
      setOpen(true)
      //console.log(response);
      
    })
    .catch(function (error) {
      setAlertType(false)
      setOpen(true)
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
              <TextField 
                variant="outlined" 
                required fullWidth label="Teléfono" />
            </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha"
                    value={fecha}
                    sx = {{width: 2/3}}
                    onChange={(newValue) => {
                      setFecha(newValue);
                      //console.log("nuevo mes", newValue.getMonth())
                    }}
                    
                    renderInput={(params) => <TextField {...params} 
                    style ={{width: '95%', marginLeft: '1.3%'}} />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                  
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Horario *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={horario}
                        label="Horario"
                        onChange={e => 
                          {setHorario(e.target.value); 
                          //console.log(horario)
                        }}
                      >
                        {Object.entries(HOUR_GROUP).map(([key, value]) => (
                          <MenuItem key={key} value={key}> {value} </MenuItem>
                        ))}
                        
                      </Select>
                    </FormControl>
                  </Box>

              </Grid>

            <Grid item xs={12} sm={6}>
              <TextField type="number" 
                inputProps={{ min: 1, max: 10 }} 
                variant="outlined" 
                onChange={e => 
                  {setPersonas(e.target.value); 
                  //console.log(personas)
                }} 
                required fullWidth 
                label="Número de personas (máx. 10 por reservación)" />
            </Grid>
            <Grid item xs={12} sm={6}>
                  
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Número de mesa *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mesa}
                        label="Número de mesa"
                        onChange={e => 
                          {setMesa(e.target.value); 
                          //console.log(horario)
                        }}
                      >
                        <MenuItem key={1} value={1}> 1 </MenuItem>
                        <MenuItem key={2} value={2}> 2 </MenuItem>
                        <MenuItem key={3} value={3}> 3 </MenuItem>
                        <MenuItem key={4} value={4}> 4 </MenuItem>
                        <MenuItem key={5} value={5}> 5 </MenuItem>                        
                      </Select>
                    </FormControl>
                  </Box>

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
            Reservar
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            
            {alertType
              ? <Alert onClose={handleClose} severity="success" sx={{ width: '98vw' }}>
                  ¡Reservación creada exitosamente! 🔥
                </Alert>
              : <Alert onClose={handleClose} severity="error" sx={{ width: '98vw' }}>
                  Error al crear reservación 💀
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

export default Contact;
