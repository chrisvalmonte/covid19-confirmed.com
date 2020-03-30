import axios from 'axios';
import moment from 'moment';

// https://github.com/NovelCOVID/API
export const getCountries = async () =>
  await axios.get('https://corona.lmao.ninja/countries');

export const getGEOData = async () =>
  await axios.get('https://corona.lmao.ninja/jhucsse');

export const getTotals = async () =>
  await axios.get('https://corona.lmao.ninja/all');

export const getHistory = async () =>
  await axios.get('https://corona.lmao.ninja/v2/historical');

// https://newsapi.org
export const getNews = async ({ page = 1 }) =>
  await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      apiKey: process.env.REACT_APP_NEWS_API_TOKEN,
      from: moment().format('YYYY-MM-DD'),
      page,
      pageSize: 12,
      q: 'COVID',
      sortBy: 'publishedAt',
    },
  });
