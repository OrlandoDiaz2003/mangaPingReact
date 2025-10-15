
import { useContext} from "react"
import { MangaContext } from "../MangaContext"
export default function Card(){
	const {manga, loading} = useContext(MangaContext)

	if (loading) return <h1 style={{color: "white"}}>Cargando...</h1>

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
			 <a href="#" className="btn btn-primary" style={{ display:"flex", justifyContent:"center"}}>See more about this manga</a> 
		 </div> 
			))}

	  </div>
	)	
}
