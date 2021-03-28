import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

function App() {
  const queryInfo = useQuery(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (true) {
      //   throw new Error("Test Error");
      // }
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results);
    },
    { refetchOnWindowFocus: true }
  );
  console.log("queryInfo", queryInfo);
  if (queryInfo.isLoading) {
    return <div>"Loading ..." </div>;
  }
  if (queryInfo.isError) {
    return <div>{queryInfo.error.message}</div>;
  }

  if (queryInfo.isSuccess) {
    return (
      <>
        <div>
          {queryInfo.data?.map((result) => (
            <div key={result.name}>{result.name}</div>
          ))}
        </div>
        {queryInfo.isFetching && <div> *** Updating *** </div>}
      </>
    );
  }
}

export default App;
