import React, { useEffect, useState } from "react";

import { IoSearch } from "react-icons/io5";

import toast, { Toaster } from "react-hot-toast";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { requestMoviesByQuery } from "../services/api";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const searchQuery = searchParams.get("query");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query.trim().length === 0) {
      toast.success("Please enter a search term first!");
    } else {
      try {
        setIsLoading(true);
        setIsError(false);
        const searchData = await requestMoviesByQuery(query);
        setMovies(searchData);
        setSearchParams({ query: query });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    form.reset();
  };

  useEffect(() => {
    if (searchQuery === null) return;

    const fetchMoviesByQuery = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const searchData = await requestMoviesByQuery(searchQuery);
        setMovies(searchData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesByQuery();
  }, [searchQuery]);

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Search movies" type="text" name="query" />
          <button type="submit">
            <IoSearch />
          </button>
        </div>
      </form>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
