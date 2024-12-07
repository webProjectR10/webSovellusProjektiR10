const MovieList = ({movies}) => {
    return (
      <table>
      {movies.map(movie => (
        <tr key={movie.id}>
            <td>{movie.title}</td>
        <td>Rating: {movie.vote_average.toFixed(1)}</td>
        </tr>
      ))}
    </table>
    )
  }
  export default MovieList;