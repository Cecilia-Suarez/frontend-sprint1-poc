import React from "react";
import useFetch from "../hooks/useFetch";

interface Album {
  userId: number;
  id: number;
  title: string;
}

const Albums: React.FC = () => {
  useFetch<Album[]>("albums", "/albums");

  return (
    <div>
      <h2>Albums</h2>
    </div>
  );
};

export default Albums;
