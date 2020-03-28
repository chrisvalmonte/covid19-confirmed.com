import axios from 'axios';

export const getCountryData = async () =>
  await axios.get('https://corona.lmao.ninja/countries');

export const getUSAData = async () =>
  await axios.get('https://corona.lmao.ninja/jhucsse');
