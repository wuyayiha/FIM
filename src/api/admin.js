import axios from "./axios";
import adminSchema from "../constants/schemas/adminSchema";

export async function fetchAdminData(url) {
  try {
    const response = await axios.get(`/admin/${url}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addAdminData(type, payload) {
  const addUrl = adminSchema[type].add.url;

  try {
    const response = await axios.post(`/admin/${addUrl}`, null, {
      params: payload,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAdminData(type, payload) {
  const deleteUrl = adminSchema[type].delete.url;

  try {
    const response = await axios.delete(`/admin/${deleteUrl}`, {
      params: payload,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
