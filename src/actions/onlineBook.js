export const addRecentBook = payload => {
  return { type: 'add_recent_book', payload };
};

export const updateRecentChapter = payload => {
  return { type: 'update_recent_chapter', payload };
};

export const resetRecentBook = () => {
  return { type: 'reset_recent_book' };
};
