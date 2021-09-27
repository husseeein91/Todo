export const addTodo = (description) => (dispatch) => {
  dispatch({ type: "ADD_TODO", payload: { description } });
};

export const updateTodo = (id) => (dispatch) => {
  dispatch({ type: "UPDATE_TODO", payload: { id } });
};

export const removeTodo = (id) => (dispatch) => {
  dispatch({ type: "REMOVE_TODO", payload: { id } });
};
