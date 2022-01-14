import { listsStore } from "./store";
import {
  FILTER_LISTS,
  SET_ATTRIBUTES,
  SORT_LISTS,
  RESET_FILTER_LISTS,
} from "./type";

import { StoreAction } from "../interfaces";

export function listsReducer(state = listsStore, action: StoreAction) {
  switch (action.type) {
    default:
      return state;
    case SET_ATTRIBUTES:
      return { ...state, ...action.value };
    case FILTER_LISTS:
      return {
        ...state,
        readyToFetch: true,
        filter: { ...state.filter, [action.key]: action.value },
      };
    case RESET_FILTER_LISTS:
      return {
        ...state,
        readyToFetch: true,
        search: "",
        filter: { ...listsStore.filter },
      };
  }
}
