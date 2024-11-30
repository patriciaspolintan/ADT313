import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CastForm() {
    const { tmdbId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const [castInformation, setCastInformation] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        characterName: '',
        description: '',
        url: '',
    });
    const [selectedCast, setSelectedCast] = useState(null);
    const [state, setState] = useState('base');

    // Fetch cast data
    useEffect(() => {
        axios
            .get('/cast', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI`,
                },
            })
            .then((response) => {
                setCastInformation(response.data);
            })
            .catch((error) => console.error('Error fetching cast data:', error));
    }, [accessToken]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Save new cast
    const handleSave = () => {
        const newCastData = new FormData();
        newCastData.append('userId', user.userId);
        newCastData.append('movieId', tmdbId);
        newCastData.append('name', formData.name);
        newCastData.append('characterName', formData.characterName);
        newCastData.append('description', formData.description);
        newCastData.append('url', formData.url);

        axios
            .post('/cast', newCastData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI`,
                },
            })
            .then((response) => {
                setCastInformation((prev) => [...prev, response.data]);
                setState('base');
                setFormData({ name: '', characterName: '', description: '', url: '' });
            })
            .catch((error) => console.error('Error saving cast:', error));
    };

    // Update existing cast
    const handleUpdate = () => {
        const updatedCastData = {
            ...selectedCast,
            name: formData.name,
            characterName: formData.characterName,
            description: formData.description,
            url: formData.url,
        };

        axios
            .patch(`/cast/${selectedCast.id}`, updatedCastData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI`,
                },
            })
            .then(() => {
                setCastInformation((prev) =>
                    prev.map((cast) => (cast.id === selectedCast.id ? updatedCastData : cast))
                );
                setState('base');
                setSelectedCast(null);
            })
            .catch((error) => console.error('Error updating cast:', error));
    };

    // Delete a cast
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this cast?')) {
            axios
                .delete(`/cast/${id}`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI`,
                    },
                })
                .then(() => {
                    setCastInformation((prev) => prev.filter((cast) => cast.id !== id));
                })
                .catch((error) => console.error('Error deleting cast:', error));
        }
    };

    // Render form for adding or updating cast
    const renderForm = () => (
        <div>
            <form>
                <label>
                    Cast Profile (URL):
                    <input type="text" name="url" value={formData.url} onChange={handleInputChange} />
                </label>
                <label>
                    Cast Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Character Name:
                    <input type="text" name="characterName" value={formData.characterName} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                </label>
            </form>
            <button onClick={state === 'add' ? handleSave : handleUpdate}>
                {state === 'add' ? 'Save' : 'Update'}
            </button>
            <button onClick={() => setState('base')}>Cancel</button>
        </div>
    );

    return (
        <div>
            <button onClick={() => setState('add')}>Add Cast</button>
            {state !== 'base' && renderForm()}

            {castInformation
                .filter((cast) => cast.movieId === parseInt(tmdbId, 10))
                .map((cast) => (
                    <div key={cast.id}>
                        <img src={cast.url} alt={`${cast.name}`} />
                        <h1>{cast.name}</h1>
                        <h3>{cast.characterName}</h3>
                        <p>{cast.description}</p>
                        <button onClick={() => {
                            setSelectedCast(cast);
                            setFormData({
                                name: cast.name,
                                characterName: cast.characterName,
                                description: cast.description,
                                url: cast.url,
                            });
                            setState('update');
                        }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(cast.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}

export default CastForm;
