import "./App.css";
import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <FetchData />
      <Loading />
      <Error />
    </>
  );
}

const FetchData = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data");
  return <div>Data: {JSON.stringify(data)}</div>;
};
const Loading = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/loading");
  return <div>{loading ? "Loading ..." : "Loaded"}</div>;
};
const Error = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/error");
  return <div>Error: {JSON.stringify(error)}</div>;
};

const useJsonFetch = (url, opts) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, opts)
      .then((response) => {
        if (response.status >= 500) {
          setError(response.status);
        }
        return response;
      })
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [url, opts]);

  return [data, loading, error];
};

export default App;
