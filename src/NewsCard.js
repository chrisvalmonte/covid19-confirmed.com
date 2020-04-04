import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import imgNotAvailable from './img-not-available.png';

const useStyles = makeStyles({
  action: {
    display: 'block',
    padding: '8px',
    textAlign: 'right',
  },

  media: {
    height: '225px',
  },
});

export default function NewsCard({ description, title, url, urlToImage }) {
  const classes = useStyles();

  return (
    <Card component="section">
      <CardActionArea
        onClick={event => {
          event.currentTarget.querySelector(`.${classes.action}`).click();
        }}
      >
        <CardMedia
          className={classes.media}
          image={urlToImage || imgNotAvailable}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>

        <Link
          className={classes.action}
          color="primary"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button color="inherit" size="small">
            Read more
          </Button>
        </Link>
      </CardActionArea>
    </Card>
  );
}
