import { useState, useEffect } from "react"

export default function Reactions() {
    const [sportGifs, setSportGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchSportGifs = async () => {

            try{

            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=reactions&limit=25`)
            const data = await response.json();
            setSportGifs(data.data);

            }catch(error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchSportGifs()
    }, [])
    return (
        <div>
            <h2>Reaction GIFs</h2>
            <div className="trending-container">
                {sportGifs.map((gif) => (
                    <div className="reactions-gif" key={gif.id}>
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