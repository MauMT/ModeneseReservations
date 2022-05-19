import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import { Home, Products, Sucursales, Contact, Promociones, Reservaciones, Login } from '../views';

import { Grid, Tab, Tabs } from '@material-ui/core';

const routes = [
  {
    name: 'Inicio',
    ruta: '/',
    component: Home,
  },
  {
    name: 'Menú',
    ruta: '/menu',
    component: Products,
  },
  {
    name: 'Promociones',
    ruta: '/promociones',
    component: Promociones,
  },
  {
    name: 'Sucursales',
    ruta: '/sucursales',
    component: Sucursales,
  },
  {
    name: 'Reservación',
    ruta: '/reservacion',
    component: Contact,
  },
  {
    name: 'Reservaciones',
    ruta: '/reservaciones',
    component: Reservaciones,
  },
  {
    name: 'Login',
    ruta: '/login',
    component: Login,
  }
];


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '50px',
  },
}));
// usado para a¿ocultar login y reservaciones si no se está logeado
const Menu = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [rutas, setRutas] = React.useState(routes);
  useEffect(() => {
    if(!window.sessionStorage.getItem('token')){
      setRutas(routes.filter(elem => (elem.name != 'Reservaciones' && elem.name != 'Login')));
    }
  })

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar color="inherit">
        <Grid container justify={'center'}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="menu"
          >
            {rutas.map((elem, index) => (
              <Tab
                key={elem.name}
                component={Link}
                to={elem.ruta}
                label={elem.name}
              />
            ))}
          </Tabs>
        </Grid>
      </AppBar>
    </div>
  );
};

export { routes };
export default Menu;
