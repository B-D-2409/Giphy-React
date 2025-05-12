import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleGif() {
    const { id } = useParams();
    const [single, setSingle] = useState(null); 

    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchSingleGif = async () => {
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`);

                const data = await response.json();
                setSingle(data.data);
            } catch (error) {
                console.error('Fetch error',error);
            }
        };

        fetchSingleGif();
    }, [id]);

    if (!single || !single.images) return <p>Loading...</p>;

    return (
        <div>
            <h1>{single.title}</h1>
            <img src={single.images.original.url} alt={single.title} />
            <p>Username: {single.username || "Unknown"}</p>
        </div>
    );
}
