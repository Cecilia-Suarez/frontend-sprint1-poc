import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  /*baseURL: "https://reqres.in",*/
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
