export const ACTIONS = {
  MOVIE_ADD: "MOVIE_ADD",
  MOVIE_REMOVE: "MOVIE_REMOVE",
  WATCHED_TOGGLE: "WATCHED_TOGGLE",
  RATING_SET: "RATING_SET",
  NOTE_SET: "NOTE_SET",
};

export function watchlistReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MOVIE_ADD: {
      const exists = state.some((m) => m.id === action.payload.id);
      if (exists) return state;
      return [...state, action.payload];
    }

    case ACTIONS.MOVIE_REMOVE:
      return state.filter((m) => m.id !== action.payload.id);

    case ACTIONS.WATCHED_TOGGLE:
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, watched: !m.watched } : m,
      );

    case ACTIONS.RATING_SET:
      return state.map((m) =>
        m.id === action.payload.id
          ? { ...m, rating: action.payload.rating }
          : m,
      );

    case ACTIONS.NOTE_SET:
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, note: action.payload.note } : m,
      );

    default:
      return state;
  }
}
