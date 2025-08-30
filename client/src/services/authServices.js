import axiosInstance from "../utils/axios";
const getProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

const updateProfile = async (data) => {
  const response = await axiosInstance.put("/users/profile", data);
  return response.data;
};

export default { getProfile, updateProfile };
