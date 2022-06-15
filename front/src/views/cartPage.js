import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {
    makeStyles
} from '@material-ui/core';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

// From https://stackoverflow.com/a/41186827 by T.J Crowder
const removeZero = item => (
    Object
      .keys(item)
      .filter(key => item[key] !== 0)
      .reduce((newObj, key) => {
        newObj[key] = item[key];
        return newObj;
      }, {})
  );

function cartRow(producto) {
    let name = producto[0];
    let amount = producto[1];
    if(amount > 0) 
    {
      return (
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={name} secondary={amount} />
          </ListItemButton>
        </ListItem>
      ); 
    }
    return (null);
};

const Cart = () => {
  // get the productos para obtener precios?
  let productos = window.sessionStorage.getItem('cart');
  if (productos === null)
  {
    return (
      <h1>
        Cart vacío 
      </h1>
    );
  }
  else
  {
    console.log("lso productos:",productos);
    productos = JSON.parse(productos);
    productos = removeZero(productos);
    
    return (
      <List>
        {Object.entries(productos).map((producto) => (
          cartRow(producto)
        ))
        }
      </List>
      
    );
  }
};

const CartPage = () => {
  const history = useHistory();
  return (
    <>
      <h1>Cart</h1>
      <Cart></Cart>
      <Button variant="outlined" onClick={() => {
        alert('Enviar orden')
      }}>Enviar Orden</Button>
      <Button variant="outlined" onClick={() => {
        window.sessionStorage.removeItem('cart');
        alert('Se ha borrado el carrito')
        history.push('/')

      }}>Cancelar</Button>
    </>
  )
};

export default CartPage;
