import { JokesAction, JokesState } from "../App";


export function jokesReducer(state: JokesState, action: JokesAction) {
    switch (action.type) {
      case "AMOUNT_ADDED":
        return {
          ...state,
          jokes: [...state.jokes, ...action.payload],
        };
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }