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
              src="https://www.modenese.mx/images/Modenese-1.jpg"
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
