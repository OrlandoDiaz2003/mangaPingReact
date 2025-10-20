import { createContext, useState, useEffect} from "react";
import useMangaFetch from "./hooks/useMangaInfo";

export const MangaContext = createContext()

export default function MangaProvider({ children, url = "https://kitsu.io/api/edge/manga?sort=popularityRank"}){
	
	const {data,loading} = useMangaFetch(url)
	return (
		<MangaContext.Provider value={ {manga: data, loading} }>
			{ children }

		</MangaContext.Provider>
	)
}
