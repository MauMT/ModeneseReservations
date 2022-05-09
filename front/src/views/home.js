import React from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import LazyLoad from 'react-lazyload';

const Home = () => {
  return (
    <Container component="main" maxWidth="md">
      <Grid container justify="center">
        <Grid item xs={12}>
          <LazyLoad once>
            <img
              src="https://scontent.fntr4-1.fna.fbcdn.net/v/t39.30808-6/241211218_4520655647980637_8557238827873943250_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeG5kGhozPx8iTEZoEEjP0lIoK_aLjedKoygr9ouN50qjHmASlD4aQNtRrRUkJUu3lLLj3LEwhHzOgGjZDqLzt77&_nc_ohc=5ODquRtUE8oAX9VOxTd&_nc_ht=scontent.fntr4-1.fna&oh=00_AT-34NySkVUE9yK_AyubO2rjjPuQNa4DvFltFzgOFxYByQ&oe=626E7C1F"
              alt="foto de final"
              style={{
                width: '100%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <h2>¿Quienes Somos?</h2>
          <div>
            <Typography>
              <i>Amamos crear comida</i>
            </Typography>
            <Typography>
              Somos el mejor restaurante de Monterrey, no dudes en venir!
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
