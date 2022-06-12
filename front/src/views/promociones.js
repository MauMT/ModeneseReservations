import {
  Typography,
  makeStyles,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';
import React from 'react';
import promociones from '../config/promociones.json';

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

const Promociones = () => {
  const style = styles();

  return (
    <Container className={style.cardGrid} maxWidth="md">
      <Grid container spacing={5}>
        {promociones.map((promo, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className={style.card}>
              <CardMedia
                className={style.cardMedia}
                image={promo.image}
                title="Image title"
              />
              <CardContent className={style.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {promo.title}
                </Typography>
                {promo.description.map((desc, index) => (
                  <Typography key={index}>{desc}</Typography>
                ))}
              </CardContent>
              <CardActions>
                <Typography variant="subtitle2" key={index}>{promo.expiry}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Promociones;
