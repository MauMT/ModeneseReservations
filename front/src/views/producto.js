import {
    Typography,
    makeStyles,
    Card,
    CardMedia,
    CardContent,
    IconButton,
  } from '@material-ui/core';
  import { useState } from 'react';


export default function Producto (producto) {
  const style = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '90%',
      height: '140px'
    },
    cardContent: {
      flexGrow: 1,
    },
  }));
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count+1);
  }
  const decreaseCount = () => {
    if (count > 0) 
    {
      setCount(count-1);
    }
  }
  return (
      
        <Card className={style.card}>
          <CardMedia
            className={style.cardMedia}
            image={producto.imagen}
            title="Image title"
            style={{height:200}}
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
            <IconButton aria-label="remove" onClick={decreaseCount}>-</IconButton>
            <IconButton aria-label="add" onClick={incrementCount}>+</IconButton>
            <p>{count}</p>
          </CardContent>
        </Card>
    );
  }
