import {
  Typography,
  makeStyles,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
//import productos from '../config/productos.json';
import axios from 'axios';

import Producto from './producto';


const styles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

let products = [];
axios.get('http://localhost:3001/api/getProductos')
  .then(function (response) {
    //handle success
    products = response.data.productos;
    console.log(products);
  })
  .catch(function (error) {
    //handle error
    console.log('error retrieving data');
  })

const Productos = () => {
  const style = styles();
  const [count, setCount] = useState([]);
  return (
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {products.map((producto) => (
          <Grid item key={producto.nombreProducto} xs={12} sm={6} md={4}>
            <Producto {...producto}></Producto>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productos;
