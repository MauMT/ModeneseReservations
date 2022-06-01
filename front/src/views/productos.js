import {
  makeStyles,
  Container,
  Grid,
  Button,
} from '@material-ui/core';

import React, {useState, useEffect} from 'react';

//import productos from '../config/productos.json';
import axios from 'axios';

import Producto from './producto';


const styles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));


const Productos = () => {
  const style = styles();
  var productosCart = {}
  const [selectedProducto, setSelectedProducto] = useState();
  const [products, setProducts] = useState([])

  const setProducto = (nombre, amount) => {
    productosCart[nombre] = amount;
  }
  products.forEach(producto => {
    productosCart[producto.nombreProducto] = 0;
  });

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
  ,[])
  
  return (
    <>
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {products.map((producto) => (
          <Grid item key={producto.nombreProducto} xs={12} sm={6} md={4}>
            <Producto producto={producto} setSelectedProducto={setProducto}></Producto>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Button onClick={() => {console.log(productosCart)}}>
          Checkout
    </Button>
    </>
  );
};

export default Productos;
