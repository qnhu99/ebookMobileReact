export const updateRecentOnlineBooks = payload => {
  return {
    type: 'update-recent-online-books',
    payload,
  };
};

export const updateRecentOnlineChapter = payload => {
  return {
    type: 'update-recent-online-chapter',
    payload,
  };
};
