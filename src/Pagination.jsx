import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async (page, pageSize) => {
  // Backend pagination query 
  const res = await fetch(`${API_URL}?_page=${page}&_limit=${pageSize}`);
  const data = await res.json();
  const total = res.headers.get("x-total-count"); // toplam veri sayısı
  return { data, total: Number(total) };
};

const Pagination = ({ pageSize = 10 }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ["posts", page],
    () => fetchPosts(page, pageSize),
    { keepPreviousData: true } // önceki sayfayı cache’te tutar
  );

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Paginated Posts</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.data.map((post) => (
            <li key={post.id}>
              <strong>{post.id}:</strong> {post.title}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
