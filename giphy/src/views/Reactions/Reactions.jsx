import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Reactions() {
    const [reactionsGifs, setReactionsGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchReactionsGifs = async () => {

            try {

                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=reactions&limit=25`)
                const data = await response.json();
                setReactionsGifs(data.data);

            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchReactionsGifs()
    }, [])
    return (
        <div>
            <h2>Reaction GIFs</h2>
            <div className="reactions-container">
                {reactionsGifs.map((gif) => (
                    <div className="reactions-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))}
                <InfiniteGifScroll category="reactions" />
            </div>
        </div>
    );
}