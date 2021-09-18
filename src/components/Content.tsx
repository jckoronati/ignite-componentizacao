import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  selectedGenreId: number;
}

export default function Content(props: MovieProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreTitle, setSelectedGenreTitle] = useState('');
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenreTitle(response.data.title);
    })
  }, [props.selectedGenreId]);

  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );  
}