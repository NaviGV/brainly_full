import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
title: string;
  type:  "youtube" | "twitter";
  link: string;
}

const useContent = (reloadTrigger: any) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setContents(response.data.content); 
        
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadTrigger]);

  return { contents, loading, error };
};

export default useContent;
