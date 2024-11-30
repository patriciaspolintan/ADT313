import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, NavLink } from 'react-router-dom';
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
    const [error, setError] = useState('');
    let { movieId } = useParams();
    const navigate = useNavigate();

    // Fetch movie details if editing an existing movie
    useEffect(() => {
        if (movieId) {
            axios
                .get(`/movies/${movieId}`)
                .then((response) => {
                    const data = response.data;
                    setMovie(data);
                    setTitle(data.title);
                    setOverview(data.overview);
                    setPopularity(data.popularity);
                    setReleaseDate(data.releaseDate);
                    setVoteAverage(data.voteAverage);
                    setPosterPath(data.posterPath);
                })
                .catch((error) => {
                    console.error(error);
                    setError('Failed to fetch the movie details. Please try again later.');
                });
        }
    }, [movieId]);

    const handleSave = () => {
        // Save logic (unchanged)
    };

    const handleDelete = () => {
        // Delete logic (unchanged)
    };

    return (
        <>
            <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="container">
                <form>
                    <div className="movie-info">
                        {posterPath && <img className="poster-image" src={posterPath} alt={title} />}
                        <div className="movie-details">
                            {/* Movie fields */}
                            <div className="field">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Overview:</label>
                                <textarea
                                    rows={10}
                                    value={overview}
                                    onChange={(event) => setOverview(event.target.value)}
                                />
                            </div>
                            {/* Other fields */}
                            <button type="button" onClick={handleSave}>
                                Save
                            </button>
                            {movieId && (
                                <button type="button" onClick={handleDelete} className="delete-button">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Navigation for Sub-Routes */}
            <div>
                <hr />
                <nav>
                    <ul className="tabs">
                        <li>
                            <NavLink
                                to={`/main/movies/form/${movieId}/cast-and-crews`}
                                className={({ isActive }) => (isActive ? 'active-tab' : '')}
                            >
                                Cast & Crews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/main/movies/form/${movieId}/videos`}
                                className={({ isActive }) => (isActive ? 'active-tab' : '')}
                            >
                                Videos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/main/movies/form/${movieId}/photos`}
                                className={({ isActive }) => (isActive ? 'active-tab' : '')}
                            >
                                Photos
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    );
};

export default Form;
