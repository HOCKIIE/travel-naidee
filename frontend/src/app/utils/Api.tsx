import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

export const fetchTravels = async (keyword?: string) => {
  const response = await axios.get(`${API_URL}/api/trips`, {
    params: { keyword },
  });
  return response.data;
};
