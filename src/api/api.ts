import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://ftl-equipo-22-noche-13.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;
