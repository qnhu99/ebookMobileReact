const InitialState = {
  theme: { label: 'Light', value: '#fafafa', textColor: '#000000' },
  fontSize: 15,
  lineHeight: 1.4,
};

export default function(state = InitialState, action) {
  switch (action.type) {
    case 'set_theme':
      return { ...state, theme: action.payload };
    case 'set_font_size':
      return { ...state, fontSize: action.payload };
    case 'set_line_height':
      return { ...state, lineHeight: action.payload };
    default:
      return state;
  }
}
