import axios from "axios";

const API_KEY = "0110bb7153fc849487afe8344dcdd8c7";
const API_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTEwYmI3MTUzZmM4NDk0ODdhZmU4MzQ0ZGNkZDhjNyIsInN1YiI6IjY2MTE0ZDBkZGY4NmE4MDE3ZTUzOTM2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8A6WobhG3FGyxBetomTJN5raH9w7J8hClpmDuLPz99E";

export const requestMovies = async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    {
      params: {
        language: "en-US",
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
  );
  return data.results;
};

export const requestMoviesByQuery = async (query) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        language: "en-US",
        api_key: API_KEY,
        query: query,
      },
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
  );
  return data.results;
};

export const requestMoviesById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        language: "en-US",
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
  );
  return data;
};

export const requestMoviesByCast = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        language: "en-US",
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
  );

  return data;
};

export const requestMoviesByReviews = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      params: {
        language: "en-US",
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
  );

  return data;
};
