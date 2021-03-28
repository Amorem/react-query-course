import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

function App() {
  const queryInfo = useQuery("pokemon", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results);
  });
  console.log("queryInfo", queryInfo);
  return queryInfo.isLoading ? (
    "Loading ..."
  ) : (
    <div>
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}

export default App;
