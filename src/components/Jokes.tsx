import { useJokes } from "./JokesProvider";

export default function Jokes() {
  const { state } = useJokes(); 

  return (
    <ul>
      {state.jokes.map((joke) => (
        <li key={joke.id}>{joke.joke}</li>
      ))}
    </ul>
  );
}
