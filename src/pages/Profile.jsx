import { useEffect, useState } from "react";
import userPhoto from "../assets/user_photo.jpg";
import { authAPI, userAPI } from "../service/userServices";
import useMangaFetch from "../hooks/useMangaInfo";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);
  const [url, setUrl] = useState("");
  const { data: mangaInfo } = useMangaFetch(url || null);

  useEffect(() => {
    const load = async () => {
      const data = await authAPI.getCurrentUser();
      setUser(data);
    };
    load();
  }, []);

  useEffect(
    () => {
      if (!user) return;

      const loadFavorites = async () => {
        try {
          const favorites = await userAPI.getFavorites(user.userId);
          setFavoriteAnimes(favorites);
          setUrl(
            `https://kitsu.io/api/edge/manga?filter[id]=${favorites.join(",")}`
          );
        } catch (error) {
          console.log("Error al obtener favoritos:", error);
        }
      };

      loadFavorites();
    },
    [user],
    console.log(url)
  );

  if (!user) return <div> Cargando...</div>;
  return (
    <main>
      <div className="p-2 user-profile-info">
        <div className="profile-title">
          <h1>Profile</h1>
        </div>
        <div className="user-info d-flex flex-column flex-md-row align-items-center justify-content-center p-4 bg-dark rounded">
          <img src={userPhoto} className="user-profile-photo w-25" />
          <div className="p-2 mx-5">
            <h1 className="user-profile-title" style={{ fontSize: "2.5rem" }}>
              {user.username}
            </h1>
            <h3 className="user-profile-email">{user.email}</h3>
            <button className="btn-edit-profile btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
        className="profile-container"
      >
        <div
          style={{ gridTemplateColumns: "1fr 1fr" }}
          className="d-grid gap-3 mx-5 position-absolute"
        />
        <div className="p-2 favorites-mangas ">
          <h1 className="profile-title-favorite">My Favorites Mangas</h1>
          <div className="favorite-manga">
            {mangaInfo && mangaInfo.length > 0 ? (
              mangaInfo.map((m) => (
                <div key={m.id} className="favorites-photo-container">
                  <img className="favorites-photo" src={m.banner} />
                </div>
              ))
            ) : (
              <div style={{color:"white", fontSize:20}}>No has agregado un manga a tus favoritos</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
