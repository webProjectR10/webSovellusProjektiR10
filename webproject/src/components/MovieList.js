const MovieList = ({ movies , openModal}) => {
  return (
    <table className="home-container">
      <thead>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id} onClick={() => openModal(movie.id)}>
            <td>{movie.title}</td>
        <td>Rating: {movie.vote_average.toFixed(1)}</td>
        </tr>
      ))}
    </table>
    )
  }
  export default MovieList;