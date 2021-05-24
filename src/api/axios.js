import axios from 'axios';

const onlineServer = 'https://flask-web-scraping.herokuapp.com/';

export default axios.create({
  baseURL: onlineServer,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
