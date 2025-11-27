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

//   const mutation = useMutation({
//     mutationFn: (newTodo) => {
//       return axios.post('/todos', newTodo)
//     },
//   })

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

    // <div>
    //   {mutation.isPending ? (
    //     'Adding todo...'
    //   ) : (
    //     <>
    //       {mutation.isError ? (
    //         <div>An error occurred: {mutation.error.message}</div>
    //       ) : null}

    //       {mutation.isSuccess ? <div>Todo added!</div> : null}

    //       <button
    //         onClick={() => {
    //           mutation.mutate({ id: new Date(), title: 'Do Laundry' })
    //         }}
    //       >
    //         Create Todo
    //       </button>
    //     </>
    //   )}
    // </div>
  );
}

export default Example;
