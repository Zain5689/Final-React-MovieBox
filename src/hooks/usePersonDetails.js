import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const usePersonDetails = (id) => {
  const [data, setData] = useState({ person: null, credits: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [personRes, creditsRes] = await Promise.all([
          axios.get(`${BASE_URL}/person/${id}`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`${BASE_URL}/person/${id}/movie_credits`, {
            params: { api_key: API_KEY },
          }),
        ]);
        setData({
          person: personRes.data,
          credits: creditsRes.data.cast,
        });
      } catch (err) {
        console.error("Error fetching person details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { ...data, loading };
};
