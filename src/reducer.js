let lastCount = 3;

export default function reducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          id: ++lastCount,
          description: action.payload.description,
          resolved: false,
        },
        ...state,
      ];
    case "UPDATE_TODO":
      return state
        .map((todo) =>
          todo.id !== action.payload.id
            ? todo
            : { ...todo, resolved: !todo.resolved }
        )
        .sort((a, b) => a.resolved - b.resolved);
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}
