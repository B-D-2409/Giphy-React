import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
import { useNavigate } from "react-router-dom";
export default function Sports({ gifs }) {
    const [stickersGifs, setStickersGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStickersGifs = async () => {

            try {

                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=stickers&limit=25`)
                const data = await response.json();
                setStickersGifs(data.data);

            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }
        if (gifs.length === 0) {
            fetchStickersGifs()
        }
    }, [gifs])

    const displayGifs = gifs.length > 0 ? gifs : setStickersGifs;   

    return (
        <div>
            <h2>{gifs.length > 0 ? 'Search Results' : 'stickersGifs'}</h2>
            <div className="stickers-container">
                {displayGifs.length === 0 ? (
                    <p>No results found. Please search for GIFs.</p> 
                ) : gifs.length > 0 ? (
                    displayGifs.map((gif) => (
                        <div className="stickers-gif" key={gif.id}>
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                                onClick={() => navigate(`/single-gif/${gif.id}`)} 
                                style={{ cursor: 'pointer' }} 
                            />
                        </div>
                    ))
                ) : (
                
                    <InfiniteGifScroll category="stickers" />
                )}
            </div>
        </div>
    );
}