import { useMutation } from "@tanstack/react-query";

function Example() {
  const { data, reset, mutate, isLoading } = useMutation({
    mutationFn: async (newPost) => {
      return fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json());
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
        {data && <h3>Başarılı işlem</h3>}
      <button
        onClick={() =>
          mutate({ title: "Deneme", body: "deneme-body", userId: 1 })
        }
      >
        veri ekle
      </button>
      <button onClick={() => reset()}>veri reset</button>
    </div>
  );
}

export default Example;
