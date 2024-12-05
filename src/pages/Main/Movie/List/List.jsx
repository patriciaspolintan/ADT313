import { useNavigate } from 'react-router-dom';
import './List.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [list, setList] = useState([]);

    // Function to fetch movies from the API or database
    const getMovies = () => {
        axios.get('/movies').then((response) => {
            setList(response.data);
        });
    };

    useEffect(() => {
        getMovies();
    }, []);

    // Function to update IDs in the database after deletion
    const updateMovieIds = (updatedMovies) => {
        updatedMovies.forEach((movie, index) => {
            const newId = index + 1; // New ID starts from 1
            if (movie.id !== newId) {
                axios.put(`/movies/${movie.id}`, { id: newId }, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmZlNDkxOGE2NTAxZjg4OTFmNWU2Zjk0OWVmZjNhZSIsIm5iZiI6MTczMTIwMTY3NC43MTUwMDAyLCJzdWIiOiI2NzMwMGE4YTQ1Yjg3MDIzMTk2MmJiNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GKLJ5LU21KWKSR2D6QWTo9O6HB_-P0-gqiGByTEMzHU`,
                    },
                });
            }
        });
    };

    // Handle delete action
    const handleDelete = async (id) => {
        const isConfirm = window.confirm(
            'Are you sure that you want to delete this data?'
        );
        if (isConfirm) {
            try {
                // Delete the movie from the database
                await axios.delete(`/movies/${id}`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmZlNDkxOGE2NTAxZjg4OTFmNWU2Zjk0OWVmZjNhZSIsIm5iZiI6MTczMTIwMTY3NC43MTUwMDAyLCJzdWIiOiI2NzMwMGE4YTQ1Yjg3MDIzMTk2MmJiNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GKLJ5LU21KWKSR2D6QWTo9O6HB_-P0-gqiGByTEMzHU`,
                    },
                });

                // Update the movie list by removing the deleted movie
                const updatedList = list.filter((movie) => movie.id !== id);

                // Reassign IDs to remaining movies
                const reorderedList = updatedList.map((movie, index) => ({
                    ...movie,
                    id: index + 1,
                }));

                // Update the database with new IDs
                updateMovieIds(reorderedList);

                // Update the front-end state
                setList(reorderedList);
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };

    const handleUpdate = (id) => {
        // Navigate to the form with the movie ID to edit
        navigate('/main/movies/form/' + id);
    };

    return (
        <div className="list-container">
            <div className="create-container">
                <button
                    type="button"
                    onClick={() => {
                        navigate('/main/movies/form');
                    }}
                >
                    Create New
                </button>
            </div>
            <div className="table-container">
                <table className="movie-list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>
                                    <button type="button" onClick={() => handleUpdate(movie.id)}>
                                        Edit
                                    </button>
                                    <button type="button" onClick={() => handleDelete(movie.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;