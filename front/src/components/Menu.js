import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Home, Products, Sucursales, Contact, Promociones } from '../views';
import { Grid, Tab, Tabs } from '@material-ui/core';

const routes = [
  {
    name: 'Inicio',
    ruta: '/',
    component: Home,
  },
  {
    name: 'Productos',
    ruta: '/productos',
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
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '50px',
  },
}));

const Menu = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
            {routes.map((elem, index) => (
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
