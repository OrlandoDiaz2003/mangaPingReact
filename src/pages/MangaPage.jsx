import { useParams } from "react-router-dom";
import useMangaFetch from "../hooks/useMangaInfo";

export default function MangaPage(){

	const {title}= useParams();
	const url = `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(title)}`
	const {data, loading,error} =useMangaFetch(url)
	let manga;
	if(data && data.length > 0){
		manga = data[0]
		console.log(manga)
	}
	console.log("titulo:"+ title + "url"+ url)
	console.log("La data es: " + data)
	if (loading) return <h1>Cargando..</h1>
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
										<strong>Status: </strong>{manga.status} <span id="manga-status" />
									</p>
									<p>
										<strong>Chapter count: </strong>{manga.chapterCount} <span id="manga-chapters" />
									</p>
									<p>
										<strong>Volume count: </strong> {manga.volumeCount}<span id="manga-volumes" />
									</p>
									<p>
										<strong>Start Date: </strong> {manga.startDate}<span id="manga-start-date" />
									</p>
									<p>
										<strong>End Date: </strong> {manga.endDate}<span id="manga-end-date" />
									</p>
									<p>
										<strong>Synopsis: </strong> {manga.synopsis}<span id="manga-synopsis" />
									</p>
								</div>
							</div>
							<div>
								<button id="add-favorite-btn" className="btn btn-favorite">
									Add to Favorites
								</button>
								<button id="follow-btn" className="btn btn-follow">
									Follow
								</button>
							</div>
						</div>
					</div>
				</main>    

		</>
	)
}

