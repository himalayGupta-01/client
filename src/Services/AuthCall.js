import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_URL

const register = async (user) => {
  return await axios.post(BACKEND_URL + "/register", user);
};

const login = async (user) => {
  return await axios.post(BACKEND_URL + "/login", user);
};

const logout = async () => {
  return await axios.post(BACKEND_URL + "/logout", {});
};

export { register, login, logout };
