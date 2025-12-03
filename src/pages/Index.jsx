import { useContext, useMemo } from 'react'
import Card from '../components/Card.jsx'
import CalendarCard from '../components/CalendarCard.jsx'
import { MangaContext } from '../MangaContext.jsx'
import { AuthContext } from '../AuthContext.jsx'

export default function Index() {
  const { manga = [], loading } = useContext(MangaContext)
  const { login } = useContext(AuthContext) 

  const nextFour = useMemo(() => {
    if (!Array.isArray(manga)) return []

    const today = new Date()
		
    const itemsWithDates = manga
      .filter(m => m && m.status !== 'finished')
      .map(m => {
        const next = m.nextRelease || m.updatedAt || m.startDate || null
        const date = next ? new Date(next) : null
        return date ? { title: m.title, date, raw: next } : null
      })
      .filter(Boolean)
      .filter(i => !isNaN(i.date.getTime())) // fecha válida
      .filter(i => i.date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))

    itemsWithDates.sort((a, b) => a.date - b.date)

    return itemsWithDates.slice(0, 4)
  }, [manga])

  console.log('Index.jsx nextFour count:', nextFour.length, nextFour)

  const formatDateISO = d => {
    if (!d) return 'Fecha no disponible'
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
  }

  const isLoggedIn = !!login

  return (
    <main className="main-background">
      {!isLoggedIn && (
        <section className="mini-calendar" aria-label="Next releases calendar">
          <h2 className="calendar-title">Next releases</h2>
          <p className="p-index" style={{wordWrap:true}}>
            To stay updated with the latest manga releases, check out our personalized calendar feature. <strong>Sign up</strong> to track your favorite series and never miss a release date!
          </p>

          {loading ? (
            <p className="calendar-loading">Cargando mangas...</p>
          ) : (
            <CalendarCard />
          )}

        </section>
      )}

      <h1 className="title-index">Trending</h1>
      <p className="p-index">
        Explore the catalog of upcoming manga releases and discover which new
        series and volumes are on the way. A guide designed to keep you always
        up to date in one place.
      </p>

      <div id="card_containter" className="index-manga-card"></div>
      <Card />
    </main>
  );
}
