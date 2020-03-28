import axios from 'axios';

// github.com/NovelCOVID/API

export const getGEOData = async () =>
  await axios.get('https://corona.lmao.ninja/jhucsse');

export const getTotals = async () =>
  await axios.get('https://corona.lmao.ninja/all');
