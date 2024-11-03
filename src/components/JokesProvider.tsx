import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import { Joke, useFetch } from "./fetch-jokes";
import { jokesReducer } from "./reduce-function";

export interface JokesAction {
  type: 'AMOUNT_ADDED';
  payload: Joke[];
}

export interface JokesState {
  jokes: Joke[];
}

interface JokesContextProps {
  state: JokesState;
  dispatch: React.Dispatch<JokesAction>;
}

interface JokesProviderProps {
  jokeAmount: number;
  children: ReactNode;
}

const JokesContext = createContext<JokesContextProps | undefined>(undefined);
const initialState: JokesState = { jokes: [] };

export const JokesProvider: React.FC<JokesProviderProps> = ({ children, jokeAmount }) => {
  const [state, dispatch] = useReducer(jokesReducer, initialState);
  const [jokes, loading] = useFetch(
    'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=',
    jokeAmount
  );

  useEffect(() => {
    if (jokeAmount !== 0) {
      dispatch({ type: "AMOUNT_ADDED", payload: jokes });
    }
  }, [jokes]);

  return (
    <JokesContext.Provider value={{ state, dispatch }}>
      {children}
    </JokesContext.Provider>
  );
};

export function useJokes() {
  const context = useContext(JokesContext);
  if (context === undefined) {
    throw new Error("useJokes must be used within a JokesProvider");
  }
  return context;
}
