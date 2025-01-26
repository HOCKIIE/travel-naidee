"use client"
import { useEffect, useState } from "react";
import { fetchTravels } from "@/app/utils/Api";


const useTravels = (keyword: string) => {
  const [lists, setLists] = useState<any>([]);
  const [spinner, setSpinner] = useState<any>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  
    const getLists = async () => {
      setSpinner(true);
      try {
          const data = await fetchTravels(keyword);
          setLists(data);
      } catch (error) {
          setError("เกิดข้อผิดพลาดการรับข้อมูล");
      } finally {
          setSpinner(false);
      }
    };

    getLists();
  }, [keyword]);

  return { lists, spinner, error };
};

export default useTravels;
