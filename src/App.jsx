import { useEffect, useReducer } from "react";
import "./App.css";


function actionsReducer(state, action) {
  switch (action.type) {
    case "fetch_started": {
      return {
        joke: {},
        loading: true,
        error: ""
      }
    };
    case "fetch_success": {
      return {
        joke: action.joke,
        loading: false,
        error: ""
      }
    }
    case "fetch_failed": {
      return {
        joke: {},
        loading: false,
        error: action.error
      }
    }  
    default: return state;
  };
};

export default function App() {
  const [jokeState, dispatch] = useReducer(actionsReducer, {
    joke: {},
    loading: true,
    error: ""
  });

  async function fetchAJoke() {
  try {
    dispatch({ type: "fetch_started" });
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    dispatch({ type: "fetch_success", joke: data });
  } catch (err) {
    dispatch({ type: "fetch_failed", error: err.message });
  };
};

  useEffect(() => {
    fetchAJoke();

  }, []);

  return (
    <div>
      {jokeState.loading && <h2>Loading...</h2>}
      {jokeState.error && <h2>Error occured: {jokeState.error}</h2>}
      <h2>
        {jokeState.joke.setup} <br />
        {jokeState.joke.punchline}
      </h2>
      <button onClick={fetchAJoke}>New joke</button>
    </div>
  );
};







