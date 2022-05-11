import React from 'react';
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
//import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
//import ButtonGroup from 'react-bootstrap/ButtonGroup'

let products = [];
axios.get('http://localhost:3001/api/getProductos')
  .then(function (response) {
    //handle success
    products = response.data.productos;
    console.log(products);
  })
  .catch(function (error) {
    //handle error
    console.log('error');
  })

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

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Haz tu reservación 🍽
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Apellido"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Correo" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" inputProps={{ min: 1, max: 10 }} variant="outlined" required fullWidth label="Número de personas" />
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
