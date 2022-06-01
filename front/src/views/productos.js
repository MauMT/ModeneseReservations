import {
  Typography,
  makeStyles,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
//import productos from '../config/productos.json';
import axios from 'axios';

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
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/getProductos')
    .then(function (response) {
      //handle success
      setProducts(response.data.productos);
      console.log(products);
    })
    .catch(function (error) {
      //handle error
      console.log('error retrieving data');
    })
    }
  )
  return (
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {products.map((producto) => (
          <Grid item key={producto.nombreProducto} xs={12} sm={6} md={4}>
            <Card className={style.card}>
              <CardMedia
                className={style.cardMedia}
                image={producto.imagen}
                title="Image title"
              />
              <CardContent className={style.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {producto.nombreProducto}
                </Typography>
                <Typography gutterBottom variant="body1">
                  <strong>Precio: </strong>
                  {producto.precio}
                </Typography>
                <Typography variant="body2">{producto.descripcion}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productos;
