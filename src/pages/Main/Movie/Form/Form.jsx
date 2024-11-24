import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import './Form.css';

const Form = () => {
    const [query, setQuery] = useState('');
    const [searchedMovieList, setSearchedMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(undefined);
    const [movie, setMovie] = useState(undefined);
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [popularity, setPopularity] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [voteAverage, setVoteAverage] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(''); // State for error messages
    let { movieId } = useParams();
    const navigate = useNavigate();

    const handleSearch = useCallback((page = 1) => {
        setError(''); // Clear any previous errors
        axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI', // Update with your API key
            },
        })
            .then((response) => {
                setSearchedMovieList(response.data.results);
                setCurrentPage(page);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to search for movies. Please try again later.');
            });
    }, [query]);

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        setTitle(movie.original_title);
        setOverview(movie.overview);
        setPopularity(movie.popularity);
        setReleaseDate(movie.release_date);
        setVoteAverage(movie.vote_average);
        setPosterPath(`https://image.tmdb.org/t/p/original/${movie.poster_path}`);
    };

    const handleSave = () => {
        setError(''); // Clear any previous errors
        const accessToken = localStorage.getItem('accessToken');
        if (!title || !overview) {
            alert('Please fill in the required fields.');
            return;
        }
        const data = {
            tmdbId: selectedMovie?.id,
            title: title,
            overview: overview,
            popularity: popularity,
            releaseDate: releaseDate,
            voteAverage: voteAverage,
            backdropPath: selectedMovie
                ? `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`
                : movie?.backdropPath,
            posterPath: selectedMovie
                ? `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`
                : posterPath,
            isFeatured: 0,
        };

        const requestMethod = movieId ? 'patch' : 'post';
        const requestUrl = movieId ? `/movies/${movieId}` : '/movies';

        axios({
            method: requestMethod,
            url: requestUrl,
            data: data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(() => {
                alert('Success');
                navigate('/main/movies');
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to save the movie. Please try again later.');
            });
    };

    const handleDelete = () => {
        setError(''); // Clear any previous errors
        if (!movieId) {
            setError('Movie ID is not available for deletion.');
            return;
        }
        const accessToken = localStorage.getItem('accessToken');

        axios({
            method: 'delete',
            url: `/movies/${movieId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(() => {
                alert('Movie deleted successfully');
                navigate('/main/movies');
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to delete the movie. Please try again later.');
            });
    };

    useEffect(() => {
        if (movieId) {
            axios.get(`/movies/${movieId}`)
                .then((response) => {
                    setMovie(response.data);
                    setTitle(response.data.title);
                    setOverview(response.data.overview);
                    setPopularity(response.data.popularity);
                    setReleaseDate(response.data.releaseDate);
                    setVoteAverage(response.data.voteAverage);
                    setPosterPath(response.data.posterPath);
                })
                .catch((error) => {
                    console.error(error);
                    setError('Failed to fetch the movie details. Please try again later.');
                });
        }
    }, [movieId]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handleSearch(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handleSearch(currentPage - 1);
        }
    };

    return (
        <>
            <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {movieId === undefined && (
                <>
                    <div className='search-container'>
                        Search Movie:{' '}
                        <input
                            type='text'
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <button type='button' onClick={() => handleSearch(1)}>
                            Search
                        </button>
                        <div className='searched-movie'>
                            {searchedMovieList.map((movie) => (
                                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                                    {movie.original_title}
                                </p>
                            ))}
                        </div>
                        <div className='pagination'>
                            <button
                                type='button'
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type='button'
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <hr />
                </>
            )}
            <div className='container'>
                <form>
                    {posterPath && (
                        <img
                            className='poster-image'
                            src={posterPath}
                            alt={title}
                        />
                    )}
                    <div className='field'>
                        Title:
                        <input
                            type='text'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className='field'>
                        Overview:
                        <textarea
                            rows={10}
                            value={overview}
                            onChange={(event) => setOverview(event.target.value)}
                        />
                    </div>
                    <div className='field'>
                        Popularity:
                        <input
                            type='text'
                            value={popularity}
                            onChange={(event) => setPopularity(event.target.value)}
                        />
                    </div>
                    <div className='field'>
                        Release Date:
                        <input
                            type='text'
                            value={releaseDate}
                            onChange={(event) => setReleaseDate(event.target.value)}
                        />
                    </div>
                    <div className='field'>
                        Vote Average:
                        <input
                            type='text'
                            value={voteAverage}
                            onChange={(event) => setVoteAverage(event.target.value)}
                        />
                    </div>
                    <button type='button' onClick={handleSave}>
                        Save
                    </button>
                    {movieId && (
                        <button type='button' onClick={handleDelete} className="delete-button">
                            Delete
                        </button>
                    )}
                </form>
            </div>

            {/* Navigation for Sub-Routes */}
            <div>
                <hr />
                <nav>
                    <ul className='tabs'>
                        <li
                            onClick={() => {
                                navigate(`/main/movies/form/${movieId}/cast-and-crews`);
                            }}
                        >
                            Cast & Crews
                        </li>
                        <li
                            onClick={() => {
                                navigate(`/main/movies/form/${movieId}/videos`);
                            }}
                        >
                            Videos
                        </li>
                        <li
                            onClick={() => {
                                navigate(`/main/movies/form/${movieId}/photos`);
                            }}
                        >
                            Photos
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    );


};

export default Form;