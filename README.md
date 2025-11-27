# Purpose

Learn React Query by building small practical examples

Compare React Query and SWR 

Understand how modern data-fetching libraries work under the hood

Build intuition for which tool to choose in real projects

# What is React Query?
React Query is another powerful data-fetching and state management library for React applications. It goes beyond basic fetching and caching by offering extensive tools for managing server state, including query invalidation, background data synchronization, and fine-grained control over the caching lifecycle.

## Key Features of React Query:

1.  Full-featured caching solution
2.  Query invalidation and refetching
3.  Built-in support for pagination and infinite scrolling
4.  DevTools for debugging query state
5.  Mutation handling (for POST, PUT, DELETE requests)

# What is SWR?
SWR (Stale While Revalidate) is a React hook library developed by Vercel. The name refers to the data fetching strategy where stale data is shown while revalidating in the background. SWR is minimal and offers a simple API for fetching and caching remote data.

## Key Features of SWR:

1.  Stale-While-Revalidate strategy
2.  Automatic caching and background revalidation
3.  Focus and network reconnection auto-fetching
4.  Simple API (based on hooks)

# Comparison: SWR vs React Query
1.  Caching and Revalidation
SWR follows the Stale-While-Revalidate pattern, where it shows stale data and revalidates it in the background. This is great for scenarios where you want fast updates without forcing the user to wait.
React Query, on the other hand, offers more fine-grained control over caching, allowing you to define custom cache times, query invalidation, and refetching intervals.
2.  API Simplicity
SWR is simpler to use with fewer configurations. If your goal is to have minimal setup and effortless caching, SWR is the way to go.
React Query provides more options out of the box for handling complex use cases like pagination, mutations, and caching rules. If you need more control over server data management, React Query’s API is more feature-rich.
3.  Mutations and Side Effects
React Query excels at handling mutations (for POST, PUT, DELETE requests), offering built-in support for optimistic updates, error handling, and rollback mechanisms.
SWR focuses primarily on data fetching, leaving mutation logic to be implemented manually. However, you can pair SWR with external libraries for mutation handling.
4.  DevTools
React Query comes with DevTools that make it easy to monitor queries, their statuses, cache contents, and refetch cycles in development mode.
SWR does not have built-in DevTools, which can make debugging a bit more challenging in comparison.
5. Performance and Background Fetching
Both SWR and React Query offer features like background refetching on network reconnection or page focus, ensuring that your data stays fresh without manual intervention.
React Query tends to offer more performance customization options, like setting stale times, refetch intervals, and even disabling background refetching entirely.

## How to Choose Between SWR and React Query?
Both SWR and React Query are excellent solutions for data fetching in React, but which one should you choose?

1.  Choose SWR if: You need a simple, minimalistic solution for fetching and caching data, with a focus on the Stale-While-Revalidate pattern.
2.  Choose React Query if: You need more advanced data management features like query invalidation, paginated queries, mutation handling, or DevTools for debugging.

## Pagination with React Query
```js
import { useQuery } from 'react-query';

const fetchUsers = async (page) => {
  const res = await fetch(`/api/users?page=${page}`);
  return res.json();
};

function UsersList({ page }) {
  const { data, isLoading, isError } = useQuery(['users', page], () => fetchUsers(page));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Implementing SWR for Infinite Scrolling
```js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

function UsersList() {
  const [page, setPage] = React.useState(1);
  const { data, error } = useSWR(`/api/users?page=${page}`, fetcher);

  if (error) return <div>Error fetching users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}
```
