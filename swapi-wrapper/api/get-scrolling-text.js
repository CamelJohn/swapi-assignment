import instance from './axios.js';

// use SWAPI to get scrolling text for welcome component in frontend.
export default async () => {
  try {
    const { data: { opening_crawl } } = await instance.get('/films/1/');
    return opening_crawl.split('\r\n');
  } catch (err) {
    throw err;
  }
};
