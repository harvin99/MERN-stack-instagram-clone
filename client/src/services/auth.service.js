import axios from "../axios.config";

const FETCH_URL = "/auth";

const login = (email, password) => {
  return axios
    .post(FETCH_URL + "/signin", {
      email,
      password
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("usertoken", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("usertoken");
};

const register = (username, email, password, confirmPassword) => {
  return axios.post(FETCH_URL + "/signup", {
    username,
    email,
    password,
    confirmPassword
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("usertoken"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
