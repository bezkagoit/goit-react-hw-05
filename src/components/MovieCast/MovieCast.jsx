import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import { requestMoviesByCast } from "../../services/api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const castData = await requestMoviesByCast(movieId);
        setMovieCast(castData.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading &&
        !isError &&
        (movieCast && movieCast.length > 0 ? (
          <div>
            <ul className={css.castList}>
              {movieCast.map((actor) => (
                <li key={actor.id} className={css.castItem}>
                  <img
                    className={css.castPhoto}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={actor.name}
                  />
                  <h3 className={css.castName}>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No cast available</p>
        ))}
    </div>
  );
};

export default MovieCast;
