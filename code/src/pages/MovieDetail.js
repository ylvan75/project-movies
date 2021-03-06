import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NotFound } from '../components/NotFound';
import { Loader } from '../components/Loader';
import { BackButton } from '../components/BackButton';

import '../styles/MovieDetail.css';

export const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  const apiKey = process.env.REACT_APP_API_KEY_FOR_MOVIE;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMovie(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId, apiKey]);

  if (movie.success === false) {
    return <NotFound />;
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section
          className="movie-detail-page"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          }}>
          <BackButton path="/" text="Movies" />
          <div className="movie-details">
            <img
              className="image-poster"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-details-text">
              <h1>
                {movie.title}{' '}
                <span className="movie-rating">{movie.vote_average}/10</span>
              </h1>
              <p>{movie.overview}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
