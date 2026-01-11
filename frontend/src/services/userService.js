import axios from "axios";

const API = "https://course-platform-okkm.onrender.com/api/users";

export const getAllUsers = async (token) => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserRole = async (id, role, token) => {
  await axios.put(
    `${API}/${id}/role`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteUser = async (id, token) => {
  await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
