import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export function NewsCard({ description, title, url, urlToImage }) {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} image={urlToImage} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      <CardActionArea>
        <Link className={classes.action} color="primary" href={url}>
          <Button color="inherit" size="small">
            Read more
          </Button>
        </Link>
      </CardActionArea>
    </Card>
  );
}
