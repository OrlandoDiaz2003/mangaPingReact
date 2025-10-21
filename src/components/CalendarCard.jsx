import useMangaFetch from "../hooks/useMangaInfo";

export default function CalendarCard() {
    const MANGA_API_URL = 'https://kitsu.io/api/edge/manga?sort=-averageRating&page[limit]=20';

    const { data: mangas, loading, error } = useMangaFetch(MANGA_API_URL);

    // Función para determinar la fecha de lanzamiento a mostrar
    const getNextReleaseDate = (manga) => {
        let nextRelease = 'Fecha no disponible';

        if (manga.nextRelease) {
            nextRelease = manga.nextRelease;
        } else if (manga.updatedAt) {
            // Mostrar solo la fecha YYYY-MM-DD
            nextRelease = manga.updatedAt.split('T')[0];
        }
        return nextRelease;
    };

    if (loading) {
        return <div className="loading-message">Cargando mangas favoritos...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error.message || "No se pudieron cargar los datos."}</div>;
    }

    //Se filtran los mangas que están en curso
    const ongoingMangas = (mangas || [])
        .filter(manga => manga.status === 'current')
        .slice(0, 4);

    if (ongoingMangas.length === 0) {
        return <div className="no-data-message">No se encontraron mangas en curso para mostrar.</div>;
    }

    return (
        <div className="calendar-container">
            {ongoingMangas.map((manga) => (
                <div 
                    key={manga.title} // Usamos el título como key, asumiendo que es único
                    className="calendar-item"
                    style={{
                        backgroundImage: `url('${manga.banner}')`, // Usamos 'banner' del hook
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="calendar-overlay">
                        <div className="calendar-info">
                            <h3>{manga.title}</h3>
                            <h2>{getNextReleaseDate(manga)}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}