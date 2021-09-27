import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";

const initialState = [
  { id: 0, description: "PRAY", resolved: false },
  { id: 1, description: "Gym", resolved: false },
  { id: 2, description: "Breakfast", resolved: false },
  { id: 3, description: "Code", resolved: false },
];

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
