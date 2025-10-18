export default function Explore(){
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
						<select id="genreSelect" className="filter-select">
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
						<select id="statusSelect" className="filter-select">
							<option value="">All</option>
							<option value="current">OnGoing</option>
							<option value="finished">Finished</option>
							<option value="upcoming">Upcoming</option>
						</select>
					</li>
					<li className="mt-2">
						<label htmlFor="mangaTypeSelect">Manga type:</label>
						<br />
						<select id="mangaTypeSelect" className="filter-select">
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
						<button id="applyFilter" className="btn btn-filter btn-sm">
							Filtrar
						</button>
					</li>
				</ul>
			</div>
			<div id="card_containter" className="index-manga-card">
				{/* Cards insertadas con JS */}
			</div>
			<div className="d-flex justify-content-center mt-5 mb-5">
				<button id="loadMore" className="btn btn-loadMore btn-lg">
					Load More
				</button>
			</div>
		</main>

	)
}
