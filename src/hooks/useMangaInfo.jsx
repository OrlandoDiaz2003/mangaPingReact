import { useState, useEffect } from "react";

export default function useMangaFetch(url) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        
        setLoading(true);
        setError(undefined);
        setData(undefined);

        (async () => {
			if(!url) return
            try {
                const response = await fetch(url, {
                    signal: abortController.signal
                });
                
                if (!response.ok) {
                    throw new Error(`Http error status code: ${response.status}`);
                }
                
                const responseData = await response.json();
                const mangaInfo = responseData.data.map((data) => {
                    const info = data.attributes;
                    return {
						id: data.id,
                        title: info.titles.en || info.canonicalTitle,
                        description: info.description,
                        ranking: info.ratingRank,
                        popularityRank: info.popularityRank,
                        banner: info.posterImage.large,
                        endDate: info.endDate,
                        startDate: info.startDate,
                        status: info.status,
                        chapterCount: info.chapterCount,
                        synopsis: info.synopsis,
                        volumeCount: info.volumeCount,
                        nextRelease: info.nextRelease,
                        updatedAt: info.updatedAt
                    };
                });
                
                setLoading(false);
                setData(mangaInfo);
                
            } catch (error) {
                if (error.name === 'AbortError') return;
                
                setError(error);

                console.error(`Error: ${error}`);
                setLoading(false);
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [url]);
    
    return { data, loading, error };
}