import axios from "axios";

const apiRandomUser = axios.create({
  baseURL: "https://randomuser.me/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiRandomUser;
