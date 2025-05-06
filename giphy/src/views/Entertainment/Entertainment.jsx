import { useState, useEffect } from "react"
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
export default function Entertainment({gifs}) {
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
        if(gifs.length === 0) {

            fetchEntertainmentGifs()
        }
    }, [])
    const displayGifs = gifs.length > 0 ? gifs : setEntertainmentGifs
    return (
        <div>
        <h2>{gifs.length > 0 ? 'Search Results' : 'entertainmentGifs'}</h2>
        <div className="entertainment-container">
            {displayGifs.length === 0 ? (
                <p>No results found. Please search for GIFs.</p> 
            ) : gifs.length > 0 ? (
                displayGifs.map((gif) => (
                    <div className="entertainment-gif" key={gif.id}>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                    </div>
                ))
            ) : (
            
                <InfiniteGifScroll category="entertainment" />
            )}
        </div>
    </div>
    );
}