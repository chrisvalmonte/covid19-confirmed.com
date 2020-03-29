import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Waypoint } from 'react-waypoint';

import { NewsCard } from './NewsCard';
import { getNews } from './services';

const useStyles = makeStyles(() => ({
  newsAPICredit: {
    textAlign: 'right',
  },
  root: {
    backgroundColor: grey[300],
    flexGrow: 1,
    height: '100vh',
    overflowY: 'auto',
    paddingBottom: '16px',
    paddingTop: '16px',
  },
}));

export function News() {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get news articles when component mounts
  useEffect(() => {
    const _newsData = async () => {
      const {
        data: { articles },
      } = await getNews({ page: currentPage });

      setNewsArticles(articles);
      setCurrentPage(currentPage + 1);
    };

    _newsData();
  }, []); // eslint-disable-line

  const _getNextPage = async () => {
    const {
      data: { articles },
    } = await getNews({ page: currentPage });

    setNewsArticles(
      _.uniqBy([...newsArticles, ...articles], ({ title }) => title),
    );
    setCurrentPage(currentPage + 1);
  };

  return (
    <article className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.newsAPICredit} variant="body2">
              Powered by <Link href="https://newsapi.org/">newsapi.org</Link>
            </Typography>
          </Grid>
          {newsArticles.map(article => (
            <Grid item key={article.title} xs={12} sm={6} lg={4}>
              <NewsCard {...article} />
            </Grid>
          ))}

          <Waypoint onEnter={_getNextPage} />
        </Grid>
      </Container>
    </article>
  );
}
