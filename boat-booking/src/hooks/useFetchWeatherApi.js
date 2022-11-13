import React, { useState, useEffect } from "react";

export const useFetchWeatherApi = (baseUrl) => {
  const lat = -36.85;
  const lon = 174.76;
  const fullUrl = `${baseUrl}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&exclude=Minutely,Hourly,Historical,National
  &units=metric`;

  const [item, setItem] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState({});
  useEffect(() => {
    setPending(true);
    fetch(fullUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        setError(err);
      });
  }, [baseUrl]);
  return { item, pending, error };
};
