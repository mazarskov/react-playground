import "./App.css";
import { useReducer, useEffect, useState, Dispatch } from "react";
import { Joke, useFetch } from "./components/fetch-jokes";
import { jokesReducer } from "./components/reduce-function";

export interface JokesAction {
  type: 'AMOUNT_ADDED',
  payload: Joke[]
}
export interface JokesState {
  jokes: Joke[];
}

export default function App() {
  const [jokeAmount, setJokeAmount] = useState<number>(0);
  const [jokes, loading] = useFetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=', jokeAmount);
  const [tempInput, setTempInput] = useState<number>(0);

  const initialState:JokesState = {
    jokes: []
  }

  const [state, dispatch] = useReducer(jokesReducer, initialState);
   


  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempInput(Number(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setJokeAmount(tempInput);
  };

  useEffect(() => {
    if(jokeAmount !== 0) dispatch({ type: "AMOUNT_ADDED", payload: jokes });
    setJokeAmount(0);
  }, [jokes]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="number" onChange={handleAmountChange} className="input"/>
        <button type="submit" className="submitButton">Add</button>
      </form>
      <ul>
      {state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
      </ul>
    </>
  );
}

// export default function App() {
//   const [jokeAmount, setJokeAmount] = useState<number>(10);
//   //const customHookFetch: Joke[] = useFetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=', jokeAmount);
//   // console.log("cust",customHookFetch);
//   const [joke, setJoke]:Joke[] = useFetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=', jokeAmount);
//   console.log(joke, "fdsfdsfdsfsdfsdfdsfsdfdsf");
//   const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setJokeAmount(Number(event.target.value));
//   };

//   return (
//     <>
//       <input type="number" onChange={handleAmountChange}></input>
//       <ul>
//         {/* {joke.map((j) => <li>{j.joke}</li>)} */}
//       </ul>
//     </>
//   );
// }

  // useEffect(() => {
  //    const fetchJoke = async() => {
  //     const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount='+ jokeAmount);
  //     if (!response.ok) {
  //       throw new Error(`An errror has occured: ${response.status}`)
  //     }
      
  //     const jokes = await response.json();
  //     console.log(jokes);
  //     if(jokeAmount === 1){
  //       setJoke([jokes]);
  //     }
  
  //     setJoke(jokes.jokes);
  //   }
  //   fetchJoke();
  // }, [jokeAmount]);

