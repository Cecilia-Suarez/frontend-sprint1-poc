import useFetch from "../hooks/useFetch";

interface Album {
  userId: number;
  id: number;
  title: string;
}

const Albums = () => {
  const { data: albums, isLoading } = useFetch<Album[]>("albums", "/albums");

  const groupedAlbums = albums?.reduce<Record<number, Album[]>>((acc, album) => {
    if (!(album.userId in acc)) {
      acc[album.userId] = [];
    }
    acc[album.userId].push(album);
    return acc;
  }, {});

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <h2>Albums</h2>
      {groupedAlbums &&
        Object.entries(groupedAlbums).map(([userId, items]) => (
          <div key={userId}>
            <h2>Usuario {userId}</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Albums;
