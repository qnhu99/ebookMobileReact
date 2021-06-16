import axios from 'axios';

const onlineServer = 'https://ebook-main-server.herokuapp.com/';

export default axios.create({
  baseURL: onlineServer,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
