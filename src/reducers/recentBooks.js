const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'update-recent-online-books': {
      const current = {
        ...payload,
        date: new Date(),
        currentChapterIndex: -1,
        currentChapterLink: payload.chapterLinksArray[0],
      };
      const newState = [...state];
      const found = newState.findIndex(
        item => item.bookUrl === payload.bookUrl,
      );
      if (found >= 0) {
        const removed = newState.splice(found, 1)[0];
        current.currentChapterIndex = removed.currentChapterIndex;
        current.currentChapterLink =
          current.chapterLinksArray[removed.currentChapterIndex];
      }
      return [current, ...newState];
    }
    case 'update-recent-online-chapter': {
      const newState = [...state];
      const found = newState[0].chapterLinksArray.findIndex(
        item => item === payload,
      );
      if (found >= 0) {
        newState[0].currentChapterIndex = found;
        newState[0].currentChapterLink = payload;
      }
      return newState;
    }

    case 'remove-recent-online-book': {
      const newState = [...state];
      const found = newState.findIndex(item => item.bookUrl === payload);
      if (found >= 0) {
        newState.splice(found, 1);
      }
      return newState;
    }
    default:
      return state;
  }
}
