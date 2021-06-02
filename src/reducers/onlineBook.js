const InitialState = [
  // {
  //   date: new Date(),
  //   current_chapter_index,
  //   current_season_index,
  //   total_chapters,
  //   table_of_content,
  //   book_url
  // },
];

export default function(state = InitialState, { type, payload }) {
  switch (type) {
    case 'add_recent_book': {
      const found = state.find(i => i.book_url === payload.book_url);
      if (found) {
        const newState = state.filter(
          item => item.book_url !== payload.book_url,
        );
        return [{ ...found, date: new Date() }, ...newState];
      }
      return [
        {
          ...payload,
          date: new Date(),
          current_chapter_index: 0,
          current_season_index: 0,
        },
        ...state,
      ];
    }
    case 'update_recent_chapter':
      return [
        {
          ...state[0],
          current_chapter_index: payload.chapter_index,
          current_season_index: payload.season_index,
        },
        ...state,
      ];
    default:
      return state;
  }
}
