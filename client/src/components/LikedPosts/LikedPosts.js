import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Like from './Like';
import useStyles from './styles';

const LikedPosts = (props) => {
  const classes = useStyles();

  return (
    <Fade in>
      <div className={classes.myContainer}>
        <div className={classes.card}>
          <div className={classes.imageSection}>
            <img className={classes.media} src={ '/images/intro-background.jpg' } alt="BG" />
            <div className="post-overlay">
              <div className="flex between">
                <Typography variant="h3" component="h2">Mes publications favoris</Typography>

              </div>
            </div>
          </div>
      </div>
        <Grid container alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Like />
        </Grid>
      </div>
    </Fade>
  );
};

export default LikedPosts;
