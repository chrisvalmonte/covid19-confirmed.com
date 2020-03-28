import axios from 'axios';

export const getGEOData = async () =>
  await axios.get('https://corona.lmao.ninja/jhucsse');
