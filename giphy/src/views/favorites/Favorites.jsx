import { useEffect, useState } from "react"
import { getFavorites } from "../../services/users.service";
import './Favorites.css'
export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [randomGif, setRandomGif] = useState(null);
    

    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
    useEffect(() => {

        const fetchFavorites = async () => {

            const storedFavorites = await getFavorites();

            if(storedFavorites.length > 0) {
                setFavorites(storedFavorites);
                
            }else{
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&limit=1&tag=funny`
            );
            const data = await response.json();
            const randomGif = data.data;
            setFavorites((prevFavorites) => [...prevFavorites, randomGif]);
        }
        }

        fetchFavorites();
    }, [API_KEY])


    
    return (
        <div>
            <div className="favorites-container">
                {favorites.length > 0 ? (
        
                    favorites.map((gif) => (
                        <div className="favorites-gif" key={gif.id}>
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                            />
                        </div>
                    ))
                ) : randomGif ? (
                
                    <div className="favorites-gif">
                        <img
                            src={randomGif.images.fixed_height.url}
                            alt={randomGif.title}
                        />
                    </div>
                ) : (
                    <p>No results found. Please search for GIFs.</p>
                )}
            </div>
        </div>
    );
}