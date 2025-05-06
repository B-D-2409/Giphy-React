import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Sports({gifs}) {
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
        if(gifs.length === 0) {

            fetchSportsGifs()
        }
    }, [])

    
    const displayGifs = gifs.length > 0 ? gifs : setSportsGifs

    return (
        <div>
    <h2>{gifs.length > 0 ? 'Search Results' : 'sportsGifs'}</h2>
    <div className="sports-container">
        {displayGifs.length === 0 ? (
            <p>No results found. Please search for GIFs.</p> 
        ) : gifs.length > 0 ? (
            displayGifs.map((gif) => (
                <div className="sports-gif" key={gif.id}>
                    <img
                        src={gif.images.fixed_height.url}
                        alt={gif.title}
                    />
                </div>
            ))
        ) : (
        
            <InfiniteGifScroll category="sports" />
        )}
    </div>
</div>
    )
}