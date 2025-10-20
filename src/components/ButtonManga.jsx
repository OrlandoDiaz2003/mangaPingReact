import { Link } from "react-router-dom"

export default function ButtonManga(title){

	return(
			 <Link to="/manga" onClick={console.log(title)} className="btn btn-primary" style={{ display:"flex", justifyContent:"center"}}>See more about this manga</Link> 
	)
}
