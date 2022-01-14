import { createStore } from "redux";
import { listsReducer } from "./reducer";

const store = createStore(listsReducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;
