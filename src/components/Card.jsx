import { useContext} from "react"
import { MangaContext } from "../MangaContext"
import { useNavigate } from "react-router-dom"
export default function Card(){
	const {manga, loading} = useContext(MangaContext)
	const navigate = useNavigate()

	if (loading) return <h1 style={{color: "white"}}>Cargando...</h1>
	const handleClick = (title) => {
		navigate(`/manga/${encodeURIComponent(title)}`)
		console.log(title)
	}

	return(
	  <div id="card_containter" className="index-manga-card">
		{manga.map((info, index) => (

		<div id={ index } className="card" style={{width: "18rem"}}>
		   <img
			 id="index-manga-banner" 
			 src={info.banner}
			 className="card-img-top" 
			 alt="MangaBanner" 
		   /> 
		   <div className="card-body"> 
			 <h5 id="" className="card-title"> {info.title}</h5> 
			 <p id="index-anime-description" className="card-text"> 
							{info.description ? info.description.length > 200 ? info.description.slice(0,200)+'...': info.description: info.description }
			 </p> 
		   </div> 
			 <button onClick={() => handleClick(info.title)} className="btn btn-primary" style={{ display:"flex", justifyContent:"center"}}>See more about this manga</button> 
		 </div> 
			))}

	  </div>
	)	
}
