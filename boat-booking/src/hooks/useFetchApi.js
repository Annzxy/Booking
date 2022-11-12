import React, { useState, useEffect } from "react";

export const useFetchApi = (url, token) => {
  const [item, setItem] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    fetch(url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setItem(data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        setError(err);
      });
  }, [url]);
  return { item, pending, error };
};
