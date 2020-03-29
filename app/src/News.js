import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

import { NewsCard } from './NewsCard';
import { getNews } from './services';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: grey[200],
    flexGrow: 1,
    height: `calc(100vh - 60px)`,
    overflowY: 'auto',
    paddingBottom: '16px',
    paddingTop: '16px',
  },
}));

export function News() {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const _newsData = async () => {
      const {
        data: { articles },
      } = await getNews({ page: 1 });

      setNewsArticles(articles);
    };

    _newsData();
  }, []);

  return (
    <article className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {newsArticles.map(article => (
            <Grid item key={article.title} xs={12} md={6} lg={4}>
              <NewsCard {...article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </article>
  );
}
