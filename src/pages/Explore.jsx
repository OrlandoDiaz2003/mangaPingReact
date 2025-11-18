import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import { useParams, useNavigate } from "react-router-dom";
import MangaProvider from "../MangaContext.jsx";
import useMangaFetch from "../hooks/useMangaInfo.jsx";

export default function Explore() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  let { offset, title } = useParams();
  offset = Number(offset) || 0;
  const limit = 12;


  useEffect(() => {
    setCurrentPage(Math.floor(offset / limit) + 1);
  }, [offset, limit]);

  const generateUrl = (currentOffset = offset) => {
    let baseUrl = `https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=${limit}&page[offset]=${currentOffset}`;

    if (title) baseUrl += `&filter[text]=${encodeURIComponent(title)}`;
    if (selectedStatus) baseUrl += `&filter[status]=${selectedStatus}`;
    if (selectedGenre) baseUrl += `&filter[genres]=${selectedGenre}`;
    if (selectedType) baseUrl += `&filter[subtype]=${selectedType}`;

    return baseUrl;
  };

  const [url, setUrl] = useState(generateUrl());

  const { data: manga, loading } = useMangaFetch(url);
  useEffect(() => {
    setUrl(generateUrl());
  }, [offset, title, selectedGenre, selectedStatus, selectedType]);

  const applyFilters = () => {
    navigate(`/explore/0${title ? `/${encodeURIComponent(title)}` : ""}`);
  };
  const goToPage = (pageNumber) => {
    const newOffset = (pageNumber - 1) * limit;
    navigate(
      `/explore/${newOffset}${title ? `/${encodeURIComponent(title)}` : ""}`
    );
    window.scrollTo(0, 0);
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    goToPage(nextPage);
  };

  const goToPreviusPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  const renderPageNumbers = () => {
    const pages = [];
    const limit = 10;

    for (let i = 1; i <= limit; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedStatus("");
    setSelectedType("");
    navigate(`/explore/0`);
  };

  return (
    <main>
      <div>
        <h1 className="title-index">Explore</h1>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <button
          id="filter"
          className="btn btn-filter dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          Filter
        </button>
        <ul className="dropdown-menu filter-menu p-3" style={{ minWidth: 250 }}>
          <li>
            <label htmlFor="genreSelect">Géneros:</label>
            <br />
            <select
              id="genreSelect"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Space">Space</option>
              <option value="Mystery">Mystery</option>
              <option value="Magic">Magic</option>
              <option value="Supernatural">Supernatural</option>
              <option value="Police">Police</option>
            </select>
          </li>
          <li className="mt-2">
            <label htmlFor="statusSelect">Status:</label>
            <br />
            <select
              id="statusSelect"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="current">OnGoing</option>
              <option value="finished">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </li>
          <li className="mt-2">
            <label htmlFor="mangaTypeSelect">Manga type:</label>
            <br />
            <select
              id="mangaTypeSelect"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="manga">Manga</option>
              <option value="manhwa">Manhwa</option>
              <option value="manhua">Manhua</option>
              <option value="novel">Novel</option>
              <option value="oneShot">One Shot</option>
              <option value="doujin">Doujin</option>
              <option value="oel">OEL</option>
            </select>
          </li>
          <li className="mt-3 text-center">
            <button
              id="applyFilter"
              onClick={applyFilters}
              className="btn btn-filter btn-sm me-2"
            >
              Filtrar
            </button>
            <button onClick={clearFilters} className="btn btn-secondary btn-sm">
              Limpiar
            </button>
          </li>
        </ul>
      </div>

      <MangaProvider url={url}>
        <Card />
      </MangaProvider>

      {!loading && manga && manga.length > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) goToPreviusPage();
                }}
              >
                Previous
              </a>
            </li>

            {renderPageNumbers()}

            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToNextPage();
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </main>
  );
}
