import userPhoto from '../assets/user_photo.jpg'

export default function Profile(){
	const user = JSON.parse(localStorage.getItem("currentUser")) || null;
	return(
		<main>
			<div className="p-2 user-profile-info">
				<div className="profile-title">
					<h1>Profile</h1>
				</div>
				<div className="user-info d-flex flex-column flex-md-row align-items-center justify-content-center p-4 bg-dark rounded">
					<img
						src={userPhoto}
						className="user-profile-photo w-25"
					/>
					<div className="p-2 mx-5">
						<h1 className="user-profile-title" style={{ fontSize: "2.5rem" }}>
							{user.name}
						</h1>
						<h3 className="user-profile-email">{user.mail}</h3>
						<button className="btn-edit-profile btn btn-primary">
							Edit Profile
						</button>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "nowrap",
					justifyContent: "space-between"
				}}
				className="profile-container"
			>
				<div
					style={{ gridTemplateColumns: "1fr 1fr" }}
					className="d-grid gap-3 mx-5 position-absolute"
				/>
				<div className="p-2 favorites-mangas ">
					<h1 className="profile-title-favorite">My Favorites Mangas</h1>
					<div className="favorite-manga">
						<div className="favorites-photo-container">
							<img
								className="favorites-photo"
								src="https://media.kitsu.app/manga/26004/poster_image/small-a4a5de9ab5b2674bdf5b5eb9f6b59981.jpeg"
							/>
						</div>
						<div className="favorites-photo-container">
							<img
								className="favorites-photo"
								src="https://media.kitsu.app/manga/7176/poster_image/small-eb8ce254f1180451d3b8a5c5faf63504.jpeg"
							/>
						</div>
						<div className="favorites-photo-container">
							<img
								className="favorites-photo"
								src="https://media.kitsu.app/manga/38/poster_image/small-856c6f25c6a57d4f1d4570bb578af520.jpeg"
							/>
						</div>
						<div className="favorites-photo-container">
							<img
								className="favorites-photo"
								src="https://media.kitsu.app/manga/poster_images/14916/small.jpg"
							/>
						</div>
					</div>
				</div>
			</div>
		</main>

	)
}
