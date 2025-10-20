import { useState, useContext ,useEffect} from "react";

export default function useMangaFetch(url){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

	useEffect(() => {
		(async () =>{
			try {
				const response = await fetch(url)
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
						banner: info.posterImage.large,
						endData: info.endDate,
						startDate: info.startDate,
						status: info.status,
						chapterCount: info.chapterCount,
						synopsis: info.synopsis,
						volumeCount: info.volumeCount
					}
				}) 
				setLoading(false)
				setData(mangaInfo)
				console.log(mangaInfo)
			} catch (error) {
				console.error(`Error: ${error}`)
				setError(error)

			}
		})();
	}, [url])
	
	return {data, loading, error}


}
