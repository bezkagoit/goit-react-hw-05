import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {movies !== null &&
          movies.map((movie) => {
            let year = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "?";
            return (
              <li key={movie.id}>
                <Link
                  to={{ pathname: "/movies/" + movie.id }}
                  state={{ from: location }}
                >
                  {movie.title} ({year})
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MovieList;
