import { useEffect, useState } from "react";

export type Joke = {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  },
  id: number;
  safe: boolean;
  lang: string;
}

export function useFetch(url: string, amount: number = 10): [Joke[], boolean] {
  const [data, setData] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${amount}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }
        const jokes = await response.json();
        if(amount === 0){
          setData([]);
        }
        else if (amount === 1) {
          setData([jokes]);
        } else {
          setData(jokes.jokes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();
  }, [url, amount]);

  return [data, loading];
}
