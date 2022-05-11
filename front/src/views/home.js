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
              alt="foto de restaurante"
              style={{
                width: '80%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '2rem'
              }}
            />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <h3>10 años interpretando recetas clásicas y modernas de Italia</h3>
          <div>
            <Typography>
              <i>Nuestro origen</i>
            </Typography>
            <Typography>
            Módena, es una conquista antigua en el nombre de la tradición y salvaguardia de los sabores, ya que es rica en gastronomía, cultura y arquitectura, así como ciudad natal de múltiples personajes ilustres, como Enzo Ferrari, fundador de la Scuderia Ferrari y Luciano Pavarotti. el gran tenor del bello canto
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
