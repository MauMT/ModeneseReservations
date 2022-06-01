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
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HOUR_GROUP from '../config/constants/horas.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// ruta para el boton de borrar
let rutaDelete = 'http://localhost:3001/api/admin/eliminarReservacion'
let rutaEstado = 'http://localhost:3001/api/actualizarEstadoReservacion'
var adminHeader = { headers: {"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, auth-token',
 "auth-token": sessionStorage.getItem("token")}}

const Reservaciones = () => {
  const [open, setOpen] = useState(false);
  // true es la de success
  const [alertType, setAlertType] = useState(true);
  const [reservaciones, setReservaciones] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/getReservacionesActuales')
    .then(function (response) {
      //handle success
      setReservaciones(response.data.reservaciones)
      console.log(reservaciones);
    })
    .catch(function (error) {
      //handle error
      console.log('error retrieving data');
    })
  },[])

  const handleClickDelete = (e, id) => {
    console.log(id)
    axios.post(rutaDelete, {
      reservacionId: id
    }, adminHeader)
    .then(function (response) {
      console.log(response);
      // borrar de reservaciones el 
      setAlertType(true)
      setOpen(true)
      setReservaciones(reservaciones.filter(r => r._id != id))
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

  const handleEstadoChange = (e, id, idx) => {
    // hacer el request
    axios.post(rutaEstado, {
      reservacionId: id,
      estado: e.target.value
    })
    .then(function (response) {
      console.log("estado actualizado a " + e.target.value)
      console.log(response);
      setReservaciones(reservaciones.map((r, i) => {
        if (i == idx) {
          r.estado = e.target.value
        }
        return r;
      }))
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre del cliente</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="right">Horario definido</TableCell>
            <TableCell align="right">Número de personas</TableCell>
            <TableCell align="right">Número de mesa</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservaciones.map((row, idx) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombreCliente}
              </TableCell>
              <TableCell align="right">{row.fecha.substring(0, 10)}</TableCell>
              <TableCell align="right">{HOUR_GROUP[row.horarioDefinido]}</TableCell>
              <TableCell align="right">{row.numPersonas}</TableCell>
              <TableCell align="right">{row.numMesa}</TableCell>
              <TableCell align="right">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={reservaciones[idx].estado}
                  onChange={(e) => handleEstadoChange(e, row._id, idx)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                  <MenuItem value={'Aceptada'}>Aceptada</MenuItem>
                  <MenuItem value={'Cerrada'}>Cerrada</MenuItem>
                  <MenuItem value={'Cancelada'}>Cancelada</MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
              </FormControl>
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
                          ¡Reservación borrada exitosamente! 🔥
                        </Alert>
                      : <Alert onClose={handleClose} severity="error" sx={{ width: '98vw' }}>
                          Error al borrar reservación 💀
                        </Alert>
                    }
  </Snackbar>
      
    </TableContainer>
  );
}

export default Reservaciones