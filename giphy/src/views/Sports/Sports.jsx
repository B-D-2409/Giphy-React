import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Sports() {
    const [sportsGifs, setSportsGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchSportsGifs = async () => {

            try {

                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=sports&limit=25`)
                const data = await response.json();
                setSportsGifs(data.data);

            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchSportsGifs()
    }, [])
    return (
        <div>
            <h2>Sports GIFs</h2>
            <div className="sports-container">
                {sportsGifs.map((gif) => (
                    <div className="sports-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))}
                 <InfiniteGifScroll category="sports" />
            </div>
        </div>
    );
}