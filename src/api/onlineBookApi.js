const BookApi = {
  getBookDetail: pageUrl => {
    return {
      method: 'get',
      url: '/api/books?url=' + pageUrl,
    };
  },
  getChapterContent: pageUrl => {
    return {
      method: 'get',
      url: '/api/chapters?url=' + pageUrl,
    };
  },
};

export default BookApi;
