import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import { requestMoviesById } from "../services/api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = location.state?.from ?? "/";

  useEffect(() => {
    const fetchMoviesId = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await requestMoviesById(movieId);
        setMovieData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesId();
  }, [movieId]);

  const year = movieData?.release_date
    ? new Date(movieData.release_date).getFullYear()
    : "?";

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieData !== null && (
        <section>
          <NavLink to={backLinkRef} className={css.backlLink}>
            Go Back
          </NavLink>
          <div className={css.movieBaseInfo}>
            <div className={css.moviePoster}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                width="500"
                alt={movieData.title}
                className={css.movieImg}
              />
            </div>
            <div className={css.movieInfo}>
              <h1 className={css.movieTitle}>
                {movieData.title} ({year})
              </h1>
              <p>User Score: {movieData.vote_average}</p>
              <h2>Overview</h2>
              {movieData.overview}
              <h2>Genres</h2>
              {movieData.genres && (
                <p className="genres">
                  {" "}
                  {movieData.genres.map((genre) => {
                    return <span key={genre.id}>{genre.name}</span>;
                  })}
                </p>
              )}
            </div>
          </div>

          <h2>Additional information</h2>
        </section>
      )}

      <div>
        {movieData && (
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        )}
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
