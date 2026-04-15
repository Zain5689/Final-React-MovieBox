import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const usePeople = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/person/popular`, {
          params: { api_key: API_KEY },
        });
        setPeople(res.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  return { people, loading, error };
};
