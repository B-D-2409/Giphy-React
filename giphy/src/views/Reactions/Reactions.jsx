import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Reactions({gifs}) {
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

        if(gifs.length === 0) {
            fetchReactionsGifs()
        }

    }, [])

    const displayGifs = gifs.length > 0 ? gifs : setReactionsGifs
    return (
        <div>
            <h2>{gifs.length > 0 ? 'Search Results' : 'reactionsGifs'}</h2>
            <div className="reactions-container">
                {displayGifs.length === 0 ? (
                    <p>No results found. Please search for GIFs.</p> 
                ) : gifs.length > 0 ? (
                    displayGifs.map((gif) => (
                        <div className="reactions-gif" key={gif.id}>
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                            />
                        </div>
                    ))
                ) : (
                
                    <InfiniteGifScroll category="reactions" />
                )}
            </div>
        </div>
    );
}