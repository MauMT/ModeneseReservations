import {
  Typography,
  makeStyles,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import productos from '../config/productos.json';

console.log('mau')

// usar get route de products
axios.get('localhost:3001/api/getProducts').then((response) => {
  console.log(response.data);
  console.log("hola");
});



const styles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '90%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Productos = () => {
  const style = styles();

  return (
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {productos.map((producto) => (
          <Grid item key={producto.title} xs={12} sm={6} md={4}>
            <Card className={style.card}>
              <CardMedia
                className={style.cardMedia}
                image={producto.image}
                title="Image title"
              />
              <CardContent className={style.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {producto.title}
                </Typography>
                <Typography gutterBottom variant="body1">
                  <strong>Precio: </strong>
                  {producto.precio}
                </Typography>
                <Typography variant="body2">{producto.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productos;
