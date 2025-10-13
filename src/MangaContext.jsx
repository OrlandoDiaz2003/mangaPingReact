import { createContext, useState, useEffect} from "react";

export const MangaContext = createContext()

export default function MangaProvider({ children }){
	const [manga, setManga] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () =>{
			try {
				const response = await fetch("https://kitsu.io/api/edge/manga?sort=popularityRank")
				if(!response.ok){
					throw new Error(`Http error status code:${response.status}`)
				}
				const responseData = await response.json()
				const mangaInfo = responseData.data.map((data) => {
					const info = data.attributes
					return {
						title: info.titles.en ||  info.canonicalTitle,
						description: info.description,
						ranking: info.ratingRank,
						popularityRank: info.popularityRank,
						banner: info.posterImage.large
					}
				}) 
				setLoading(false)
				setManga(mangaInfo)
				console.log(mangaInfo)
			} catch (error) {
				console.error(`Error: ${error}`)

			}
		})();
	}, [])
	return (
		<MangaContext.Provider value={ {manga, loading} }>
			{ children }

		</MangaContext.Provider>
	)
}
