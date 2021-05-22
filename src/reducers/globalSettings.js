
const InitialState = {
  fontFamily: 'TimesNewRoman',
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case 'modify_settings':
      if (action.payload.bg) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
