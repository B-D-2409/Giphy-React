import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Entertainment() {
    const [entertainmentGifs, setEntertainmentGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchEntertainmentGifs = async () => {

            try {

                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=entertainment&limit=25`)
                const data = await response.json();
                setEntertainmentGifs(data.data);

            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchEntertainmentGifs()
    }, [])
    return (
        <div>
            <h2>Entertainment GIFs</h2>
            <div className="entertainment-container">
                {entertainmentGifs.map((gif) => (
                    <div className="entertainment-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))}

                <InfiniteGifScroll
                    apiUrl={`https://api.giphy.com/v1/gifs/trending?api_key=${import.meta.env.VITE_GIPHY_API_KEY}`}
                />
            </div>
        </div>
    );
}