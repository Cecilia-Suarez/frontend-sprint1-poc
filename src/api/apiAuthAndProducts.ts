import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;
