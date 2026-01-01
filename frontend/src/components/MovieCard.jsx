import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({ movie }) {
  if (movie.mal_id === 52991) {
    console.log("blocking mideren...")
    return null
  }
  //Calls the context function to retrieve context's data
  const { favorites, isFavorite, addToFavorites, removeFromFavorites } = useMovieContext() // <-- Hook

  const favorite = isFavorite(movie.mal_id) // might need to be movie.mal_id

  function onClick(e) {
    e.preventDefault()
    if (favorite) removeFromFavorites(movie.mal_id)
    else addToFavorites(movie)
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`${movie.images.jpg.large_image_url}`} alt={movie.title} />
        <div className="movie-overlay">
          {/* Adding active trait to classname to toggle favorite */}
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onClick}>
            ♥︎
          </button>
        </div>
      </div>
      <div className="movie-info">
          <h3>{movie.title}</h3>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>{(movie.aired.from != null) ? movie.aired.from.split('-')[0] : "N/A"}</p>
          <h3>{((movie.score != null) ? movie.score + " ⭐" : "N/A ⭐")}</h3>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
