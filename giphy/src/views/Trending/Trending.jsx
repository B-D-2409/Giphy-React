import React, { useState, useEffect } from "react";
import InfiniteGifScroll from "../../components/infinite-scroll/InfiniteScroll";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Trending({ gifs }) {
    const [trendingGifs, setTrendingGifs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrendingGifs = async () => {
            try {
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/trending?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=25`
                );
                const data = await response.json();
                setTrendingGifs(data.data);
            } catch (error) {
                console.error("Error fetching trending GIFs:", error);
            }
        };

        if (gifs.length === 0) {
            fetchTrendingGifs();
        }
    }, [gifs]);

    const displayGifs = gifs.length > 0 ? gifs : trendingGifs;


    return (
        <div>
            <h2>{gifs.length > 0 ? 'Search Results' : 'Trending GIFs'}</h2>
            <div className="trending-container">
                {displayGifs.length === 0 ? (
                    <p>No results found. Please search for GIFs.</p>
                ) : (
                    displayGifs.map((gif) => (
                        <div
                            className="trending-gif"
                            key={gif.id}
                            onClick={() => navigate(`/single-gif/${gif.id}`)} 
                            style={{ cursor: 'pointer' }} 
                        >
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}
