import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Sports() {
    const [stickersGifs, setStickersGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchStickersGifs = async () => {

            try{

            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=stickers&limit=25`)
            const data = await response.json();
            setStickersGifs(data.data);

            }catch(error) {
                console.error('Error fetching gifs:', error);
            }
        }
        fetchStickersGifs()
    }, [])
    return (
        <div>
            <h2>Stickers GIFs</h2>
            <div className="stickers-container">
                {stickersGifs.map((gif) => (
                    <div className="stickers-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))}
                 <InfiniteGifScroll category="stickers" />

            </div>
        </div>
    );
}