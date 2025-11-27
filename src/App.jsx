import { useQuery } from "@tanstack/react-query";

function App() {
  //https://jsonplaceholder.org/posts
  //(useEffect kullanımındaki dependencies gibi) useQuery ile fetch yapılır (get http methodu)
  //posts-> query key
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
        response.json()
      ),
    enabled: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  return (
    <div>
      <button onClick={() => refetch()}>Veri Çek</button>
      <div>{data && data.map((dt) => <div key={dt.id}>{dt.title}</div>)}</div>
    </div>
  );
}

export default App;
