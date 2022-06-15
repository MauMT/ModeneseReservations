import * as React from 'react';
import {useReducer, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HOUR_GROUP from '../config/constants/horas.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// ruta para el botón de borrar
//let rutaDelete = 'https://modenese-server.herokuapp.com/api/admin/eliminarProducto'
let rutaDelete = 'http://localhost:3001/api/admin/eliminarProducto'
var adminHeader = { headers: {"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, auth-token',
 "auth-token": sessionStorage.getItem("token")}}

const Reservaciones = () => {
  const [open, setOpen] = useState(false);
  // true es la de success
  const [alertType, setAlertType] = useState(true);
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    axios.get('https://modenese-server.herokuapp.com/api/getProductos')
    .then(function (response) {
      //handle success
      setProductos(response.data.productos)
      console.log(productos);
    })
    .catch(function (error) {
      //handle error
      console.log('error retrieving data');
    })
  },[])

  const handleClickDelete = (e, id) => {
    console.log(id)
    axios.post(rutaDelete, {
      productoId: id
    }, adminHeader)
    .then(function (response) {
      console.log(response);
      
      setAlertType(true)
      setOpen(true)
      setProductos(productos.filter(r => r._id != id))
    })
    .catch(function (error) {
      setAlertType(false)
      setOpen(true)
      console.log(error.response);
    }); 
  } 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre del producto</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((row, idx) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombreProducto}
              </TableCell>
              <TableCell align="right"><img src={row.imagen} width="100px" height="auto" /></TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">
             
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined"
                    style={{
                      color: "#FF0000",
                      borderColor: '#FF0000'
                  }}
                  onClick={(e)=> handleClickDelete(e, row._id)}
                  >Borrar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    
                    {alertType
                      ? <Alert onClose={handleClose} severity="success" sx={{ width: '98vw' }}>
                          ¡Producto borrado exitosamente!
                        </Alert>
                      : <Alert onClose={handleClose} severity="error" sx={{ width: '98vw' }}>
                          Error al borrar el producto
                        </Alert>
                    }
  </Snackbar>
      
    </TableContainer>
  );
}

export default Reservaciones