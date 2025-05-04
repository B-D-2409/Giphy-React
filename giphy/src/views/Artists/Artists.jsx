import { useState, useEffect } from "react"

export default function Artists() {
    const [artistsGifs, setArtistsGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchArtistsGifs = async () => {

            try{

            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=artists&limit=25`)
            const data = await response.json();
            setArtistsGifs(data.data);

            }catch(error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchArtistsGifs()
    }, [])
    return (
        <div>
            <h2>Sports GIFs</h2>
            <div className="artists-container">
                {artistsGifs.map((gif) => (
                    <div className="artists-gif" key={gif.id}>
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