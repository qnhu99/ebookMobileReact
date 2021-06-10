const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'update-recent-online-books': {
      const current = { ...payload, date: new Date() };
      const newState = [...state];
      const found = newState.findIndex(
        item => item.bookUrl === payload.bookUrl,
      );
      if (found >= 0) {
        const removed = newState.splice(found, 1)[0];
        if (removed?.currentChapterLink) {
          const exist = current.chapterLinksArray.findIndex(
            item => item === removed.currentChapterLink,
          );
          if (exist >= 0) {
            current.currentChapterIndex = exist;
          }

          current.currentChapterLink = removed.currentChapterLink;
        }
      }
      return [current, ...newState];
    }
    case 'update-recent-online-chapter': {
      const newState = [...state];
      const exist = newState[0].chapterLinksArray.findIndex(
        item => item === payload,
      );
      if (exist >= 0) {
        newState[0].currentChapterLink = payload;
        newState[0].currentChapterIndex = exist;
      }
      return newState;
    }
    default:
      return state;
  }
}
