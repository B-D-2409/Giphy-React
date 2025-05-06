import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Artists({gifs}) {
    const [artistsGifs, setArtistsGifs] = useState([]);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchArtistsGifs = async () => {

            try {

                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=artists&limit=25`)
                const data = await response.json();
                setArtistsGifs(data.data);

            } catch (error) {
                console.error('Error fetching gifs:', error);
            }
        }
        if(gifs.length === 0) {

            fetchArtistsGifs()
        }
    }, [])
    const displayGifs = gifs.length > 0 ? gifs : setArtistsGifs
    return (
        <div>
        <h2>{gifs.length > 0 ? 'Search Results' : 'artistsGifs'}</h2>
        <div className="artists-container">
            {displayGifs.length === 0 ? (
                <p>No results found. Please search for GIFs.</p> 
            ) : gifs.length > 0 ? (
                displayGifs.map((gif) => (
                    <div className="artists-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))
            ) : (
            
                <InfiniteGifScroll category="artists" />
            )}
        </div>
    </div>
    );
}