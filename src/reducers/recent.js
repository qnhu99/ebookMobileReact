const InitialState = {
  books: [],
  chapters: [],
};

export default function(state = InitialState, action) {
  switch (action.type) {
    case 'add_recent_books': {
      return {
        ...state,
        books: state.books.push(action.payload),
        key: Date.now(),
      };
    }
    case 'add_recent_chapters': {
      return {
        ...state,
        books: state.chapters.push(action.payload),
        key: Date.now(),
      };
    }
    default:
      return state;
  }
}
