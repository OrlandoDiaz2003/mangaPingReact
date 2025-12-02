import { useParams } from "react-router-dom";
import useMangaFetch from "../hooks/useMangaInfo";
import { useEffect, useState } from "react";
import { authAPI, userAPI } from "../service/userServices";

export default function MangaPage() {
  const { title } = useParams();
  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const url = `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(
    title
  )}`;
  const { data, loading } = useMangaFetch(url);

  const manga = data?.[0];
  useEffect(() => {
    (async () => {
      const user = await authAPI.getCurrentUser();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const favs = await userAPI.getFavorites(user.userId);
      setFavoriteIds(favs.map(String));
    })();
  }, [user]);

   if (loading || !manga) {
    return (
      <div className="d-flex justify-content-center" style={{ color: "white", marginTop: 200 }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const isFavorite = favoriteIds.includes(String(manga.id))

  const toggleFavorite = async () => {
	if(!user) return ;

	try{
		if(isFavorite){
			await userAPI.removeFavorite(user.userId, manga.id);
			setFavoriteIds(favoriteIds.filter(id => id !== String (manga.id)))
		}
		else{
			await userAPI.addFavorite(user.userId,String( manga.id))
			setFavoriteIds([...favoriteIds, String(manga.id)])
		}
	}catch(err){
		console.error("error al actualizar favoritos: ",err)
	}
  };

  return (
    <>
      <main>
        <div className="manga-main">
          <div id="manga-poster-container">
            <img
              id="manga-poster"
              className="manga-poster"
              src={manga.banner}
              alt="Manga Poster"
            />
          </div>
          <div className="container mt-4 manga-container">
            <div id="manga-details">
              <h2 id="manga-title-h2"> {manga.title}</h2>
              <div id="manga-info">
                <p>
                  <strong>Status: </strong>
                  {manga.status} <span id="manga-status" />
                </p>
                <p>
                  <strong>Chapter count: </strong>
                  {manga.chapterCount} <span id="manga-chapters" />
                </p>
                <p>
                  <strong>Volume count: </strong> {manga.volumeCount}
                  <span id="manga-volumes" />
                </p>
                <p>
                  <strong>Start Date: </strong> {manga.startDate}
                  <span id="manga-start-date" />
                </p>
                <p>
                  <strong>End Date: </strong> {manga.endDate}
                  <span id="manga-end-date" />
                </p>
                <p>
                  <strong>Synopsis: </strong> {manga.synopsis}
                  <span id="manga-synopsis" />
                </p>
              </div>
            </div>
            <div>
              <button id="add-favorite-btn" className="btn btn-favorite" onClick={toggleFavorite}>
				{isFavorite ? "Quitar de favoritos": "Agregar a favoritos"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
