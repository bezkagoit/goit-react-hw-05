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

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieData !== null && (
        <section>
          <NavLink to={backLinkRef}>Go Back</NavLink>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
            />
            <ul>
              <li>
                <h2>{movieData.title}</h2>
              </li>
              <li>
                <p>
                  <span>Overview: </span>
                  {movieData.overview}
                </p>
              </li>
              <li>
                <p>
                  <span>User Score: </span>
                  {movieData.vote_average}
                </p>
              </li>
              {movieData.genres && (
                <li>
                  <p>
                    <span>Genres: </span>
                    {movieData.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </li>
              )}
            </ul>
          </div>
          <h2>Additional information</h2>
        </section>
      )}

      <div>
        {movieData && (
          <div>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>
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
