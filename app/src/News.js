import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';

import { NewsCard } from './NewsCard';
import { getNews } from './services';

const useStyles = makeStyles(theme => ({
  fab: {
    backgroundColor: grey[900],
    color: grey[100],
    bottom: '32px',
    position: 'fixed',
    right: '48px',
    '&:hover': {
      backgroundColor: grey[900],
    },
    [theme.breakpoints.down('sm')]: {
      bottom: '72px',
      right: '16px',
    },
  },
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

  const pageRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFabShown, setIsFabShown] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);

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

  const _scrollToTop = () => {
    pageRef.current.scrollTo(0, pageRef.current.offsetTop);
  };

  return (
    <article className={classes.root} ref={pageRef}>
      <Container>
        <Grid container spacing={3}>
          <Waypoint
            onEnter={() => {
              setIsFabShown(false);
            }}
            onLeave={() => {
              setIsFabShown(true);
            }}
          />
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
      <Zoom in={isFabShown}>
        <Fab
          aria-label="scroll back to top"
          className={classes.fab}
          onClick={_scrollToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </article>
  );
}
