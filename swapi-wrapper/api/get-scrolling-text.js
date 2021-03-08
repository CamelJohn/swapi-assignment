import instance from './axios.js';

export default async () => {
  try {
    const { data: { opening_crawl } } = await instance.get('/films/1/');
    return opening_crawl.split('\r\n');
  } catch (err) {
    throw err;
  }
};
