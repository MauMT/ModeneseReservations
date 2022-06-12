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
  let stored_cart = window.sessionStorage.getItem('cart');

  const setProducto = (nombre, amount) => {
    productosCart[nombre] = amount;
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/getProductos')
    .then(function (response) {
      //handle success
      setProducts(response.data.productos);
    })
    .catch(function (error) {
      //handle error
      console.log('error retrieving data');
    })
    }
  ,[])
  
  console.log(stored_cart);
  if (stored_cart === null) {
    console.log('N')
    products.forEach(producto => {
        productosCart[producto.nombreProducto] = 0;
      });
    }
  else {
    productosCart = JSON.parse(stored_cart);
  }
  return (
    <>
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {products.map((producto) => (
          <Grid item key={producto.nombreProducto} xs={12} sm={6} md={4}>
            <Producto producto={producto} setSelectedProducto={setProducto} initialAmount = {productosCart[producto.nombreProducto]}></Producto>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Button onClick={() => {window.sessionStorage.setItem('cart', JSON.stringify(productosCart))}}>
          Checkout
    </Button>
    </>
  );
};

export default Productos;
