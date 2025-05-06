import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import './infiniteScroll.css'
export default function InfiniteGifScroll({category}) {
    const [gifs, setGifs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    const fetchGifs = async () => {
        try {
            const url = category === 'trending'
                ? `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&offset=${(page - 1) * 5}`
                : `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=20&offset=${(page - 1) * 5}`;

            const response = await fetch(url);

            const data = await response.json();
            console.log('Fetched data:', data);

            if (data.data.length === 0) {
                setHasMore(false);
                return;
            }

            setGifs(prevGifs => {
                const newUniqueGifs = data.data.filter(
                    newGif => !prevGifs.some(prevGif => prevGif.id === newGif.id)
                );
                return [...prevGifs, ...newUniqueGifs];
            });
        } catch (error) {
            console.error('Error fetching gifs:', error);
        }
    };

    
    useEffect(() => {

        fetchGifs()

    }, [page])
    return (
        <div className="scrollableDiv" style={{ height: '100vh'}}>
        <InfiniteScroll
            dataLength={gifs.length}
            next={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            loader={
                <div className="loading-dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                </div>
            }
            scrollableTarget="scrollableDiv"
        >
            <div className='scroll-container'>
                {gifs.map((gif) => (
                    <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
                ))}
            </div>
        </InfiniteScroll>
    </div>
    
    
    )

}