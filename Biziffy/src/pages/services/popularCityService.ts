import axios from "axios";

const BASE_URL = "/api/admin/popular-cities";

export const getAllCities = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const deleteCity = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
