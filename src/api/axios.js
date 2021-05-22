import axios from 'axios';

const onlineServer = 'https://flask-web-scraping.herokuapp.com/';

// const localServer = 'http://127.0.0.1:5000/';

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
export default axios.create({
  baseURL: onlineServer,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
