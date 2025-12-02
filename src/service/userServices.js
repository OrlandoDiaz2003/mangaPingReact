import axios from "axios";

const api = axios.create({
	baseURL:"http://98.86.156.251:8080/api/v1/user",
	withCredentials: true,
	timeout: 1000,
})

api.interceptors.response.use(
	(response)  => response.data,
	(error) => {
		console.error("API ERROR: ", error.data)
		return Promise.reject(error.data || error.message)
	}
)

export const authAPI = {
	login: (username, password) => {
		return api.post("/auth/login",{username, password})
	},
	logout: () =>{
		return api.post("/auth/logout")
	},

	getCurrentUser: () =>{
		return api.get("/auth/current-user")
	},

	register: (userData) => {
		return api.post("/registerUser", userData)
	}
}

export const userAPI = {
	addFavorite: (userId, animeId) => {
		return api.post("/addFavoriteAnime", {userId, animeId})
	},

	removeFavorite: (userId, animeId) => {
		return api.delete("/removeFromFavorite", {data: {userId, animeId}})
	},

	getFavorites: (userId) => {
		return api.get(`/favoriteAnimes/${userId}`)
	}
}
export default api

