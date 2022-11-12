import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";

export const useFetchXml = (url) => {
  const [item, setItem] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((xmlString) =>
        new XMLParser().parseFromString(xmlString, "text/xml")
      )
      .then((data) => {
        setItem(data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        setError(err);
      });
  }, []);
  return { item, pending, error };
};
