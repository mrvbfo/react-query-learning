import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async ({ pageParam = 1, pageSize = 10 }) => {
  const res = await fetch(`${API_URL}?_page=${pageParam}&_limit=${pageSize}`);
  const data = await res.json();
  const total = res.headers.get("x-total-count");
  return { data, nextPage: pageParam + 1, total: Number(total) };
};

const InfiniteScroll = ({ pageSize = 10 }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 1 }) => fetchPosts({ pageParam, pageSize }),
    {
      getNextPageParam: (lastPage) => {
        const maxPage = Math.ceil(lastPage.total / pageSize);
        return lastPage.nextPage <= maxPage ? lastPage.nextPage : undefined;
      },
    }
  );

  const observerRef = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll Posts</h2>

      {isLoading && <p>Loading...</p>}

      <ul>
        {data?.pages.map((page) =>
          page.data.map((post, i) => {
            if (
              data.pages[data.pages.length - 1].data.length - 1 === i &&
              page.data === data.pages[data.pages.length - 1].data
            ) {
              return (
                <li key={post.id} ref={lastPostRef}>
                  <strong>{post.id}:</strong> {post.title}
                </li>
              );
            } else {
              return (
                <li key={post.id}>
                  <strong>{post.id}:</strong> {post.title}
                </li>
              );
            }
          })
        )}
      </ul>

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>No more posts!</p>}
    </div>
  );
};

export default InfiniteScroll;
