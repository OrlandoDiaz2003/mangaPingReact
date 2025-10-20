import { useState } from "react"
import Card from '../components/Card.jsx'
import {  useParams, useNavigate} from "react-router-dom"
import MangaProvider from "../MangaContext.jsx"

export default function Explore(){
	const [selectedGenre, setSelectedGenre] = useState("")
	const [selectedStatus, setSelectedStatus] = useState("")
	const [selectedType, setSelectedType] = useState("")
	const limit =15 
	const navigate = useNavigate()

	let {offset}= useParams()
	let offsetNum = Number(offset) 
	const [url , setUrl] = useState(`https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=${limit}&page[offset]=${offsetNum}`)
	console.log(selectedGenre,selectedStatus,selectedType)

	const handleClick = () =>{
		offsetNum += 10
		offset = offsetNum
		navigate(`/explore/${offset}`)
		window.location.reload()
		console.log(offset)

	}
	const buildUrl = () => {
	  let url = "https://kitsu.io/api/edge/manga?sort=popularityRank"
	  if(selectedGenre) url += `&filter[genres]=${selectedGenre}`;
	  if(selectedStatus) url += `&filter[status]=${selectedStatus}`;
	  if(selectedType) url += `&filter[subtype]=${selectedType}`;

	 setUrl(url)
	}

	return(
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
						<select id="genreSelect" onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
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
						<select id="statusSelect" onChange={(e) => setSelectedStatus(e.target.value)} className="filter-select">
							<option value="">All</option>
							<option value="current">OnGoing</option>
							<option value="finished">Finished</option>
							<option value="upcoming">Upcoming</option>
						</select>
					</li>
					<li className="mt-2">
						<label htmlFor="mangaTypeSelect">Manga type:</label>
						<br />
						<select id="mangaTypeSelect"onChange={(e)=> setSelectedType(e.target.value)} className="filter-select">
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
						<button id="applyFilter" onClick={buildUrl}className="btn btn-filter btn-sm">
							Filtrar
						</button>
					</li>
				</ul>
			</div>
				<MangaProvider url={url}>
					<Card />
				</MangaProvider>
			<div className="d-flex justify-content-center mt-5 mb-5">
				<button id="loadMore" onClick={handleClick} className="btn btn-loadMore btn-lg">
					Load More
				</button>
			</div>
		</main>

	)
}

