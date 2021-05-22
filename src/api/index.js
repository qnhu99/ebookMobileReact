import axios from './axios';

import BookApi from './onlineBookApi';

export { BookApi };

export default axios;

/**
 * HOW TO USE
 * For example
 * axios(
      BookApi.getBookDetail(
        'https://truyen.tangthuvien.vn/doc-truyen/luan-hoi-nhac-vien',
      ),
    )
      .then(res => {
        setState(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
 */
