import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function SignInSide() {
  const [open, setOpen] = useState(false);

  // true es la de success
  const [alertType, setAlertType] = useState(true);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    axios.post('https://modenese-server.herokuapp.com/api/user/login', JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json'
    }})
    .then((response) => {
      //handle success
      let token = response.data.data.token;
      console.log(token);
      window.sessionStorage.setItem('token', token);
      setAlertType(true)
      setOpen(true)
      //alert("Inicio de sesión exitoso");
      window.location.href='http://localhost:3000/';
    })
    .catch((error) =>{
      //handle error
      console.log('error at logging in');
      //alert("Contraseña o correo inválidos");
      setAlertType(false)
      setOpen(true)
    })
    event.target.reset();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.modenese.mx/images/Modenese-1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src="https://www.modenese.mx/images/MODEN_Logo_Negro.png"
              alt="logo modenese"
              style={{
                width: '30%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            
            {alertType
              ? <Alert onClose={handleClose} severity="success" sx={{ width: '98vw' }}>
                  ¡Logeado exitosamente!
                </Alert>
              : <Alert onClose={handleClose} severity="error" sx={{ width: '98vw' }}>
                  Usuario o contraseña incorrectos
                </Alert>
            }
          </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}