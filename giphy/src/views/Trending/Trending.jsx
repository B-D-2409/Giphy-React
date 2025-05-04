import { useState, useEffect } from "react";

export default function Trending() {
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        const fetchGifs = async () => {
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25`);
                const data = await response.json();
                setGifs(data.data);
            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }

        fetchGifs();
    }, []);


    return (
        <div>
            <h2>Trending GIFs</h2>
            <div className="trending-container">
                {gifs.map((gif) => (
                    <div className="trending-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
