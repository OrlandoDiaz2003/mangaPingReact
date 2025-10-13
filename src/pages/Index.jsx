import Card from '../components/Card.jsx'
export default function Index() {
  return (
    <main className="main-background">
      <h1 className="title-index">Trending</h1>
      <p className="p-index">
        Explore the catalog of upcoming manga releases and discover which new
        series and volumes are on the way. A guide designed to keep you always
        up to date in one place.
      </p>
      <div id="card_containter" className="index-manga-card"></div>
      <Card/>

    </main>
  );
}
