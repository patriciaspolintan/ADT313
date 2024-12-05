import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CastForm = () => {
    const { tmdbId } = useParams(); // Assuming this gets passed as a URL param
    const [cast, setCast] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmZlNDkxOGE2NTAxZjg4OTFmNWU2Zjk0OWVmZjNhZSIsIm5iZiI6MTczMTIwMTY3NC43MTUwMDAyLCJzdWIiOiI2NzMwMGE4YTQ1Yjg3MDIzMTk2MmJiNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GKLJ5LU21KWKSR2D6QWTo9O6HB_-P0-gqiGByTEMzHU',
                    },
                });
                setCast(response.data.cast);
            } catch (err) {
                console.error(err);
                setError('Failed to load cast information.');
            }
        };

        if (tmdbId) {
            fetchCast();
        }
    }, [tmdbId]);

    return (
        <div>
            <h2>Cast</h2>
            {error && <p>{error}</p>}
            {cast.length > 0 ? (
                <ul>
                    {cast.map((actor) => (
                        <li key={actor.id}>
                            <strong>{actor.name}</strong> as {actor.character}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cast information available.</p>
            )}
        </div>
    );
};

export default CastForm;

