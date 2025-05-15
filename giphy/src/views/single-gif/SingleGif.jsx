import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addGifToFavorites } from '../../services/users.service';
import './SingleGif.css';
export default function SingleGif() {
    const { id } = useParams();
    const [single, setSingle] = useState(null); 
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);


    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        const fetchSingleGif = async () => {
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`);

                const data = await response.json();
                setSingle(data.data);
            } catch (error) {
                console.error('Fetch error',error);
            }
        };

        fetchSingleGif();
    }, [id]);

    const handleFavorite = async () => {
        try {
            await addGifToFavorites(single);
            setIsFavorite(true);
        } catch (error) {
            console.error("Error with add favorite gif:", error);
        }
    }

   const handleCopyLink = () => {
        const link = single?.images?.original?.url || '';
        navigator.clipboard.writeText(link)
            .then(() => {
                setIsCopied(true);
    
            })
            .catch((error) => {
                console.error("Error copying link:", error);
            });
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(single.images.original.url);
            const blob = await response.blob();
    
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${single.title || 'download'}.gif`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsDownloaded(true);
        } catch (error) {
            console.error("Error downloading gif:", error);
        }
    };



    if (!single || !single.images) return <p>Loading...</p>;

    return (
        <div className="gif-detail">
            <div className="gif-side info">
                <h1>{single.title}</h1>
                <p className="username">{single.username || "Unknown"}</p>
            </div>
    
            <div className="gif-center">
                <img src={single.images.original.url} alt={single.title} />
            </div>
    
            <div className="gif-side actions">
                <div className="gif-detail-actions">
                    <button id="favorite-btn" onClick={handleFavorite}>
                        {isFavorite ? 'Favorited' : 'Favorite'}

                    </button>
                    <button id="copy-link-btn" onClick={handleCopyLink}>
                        {isCopied ? 'Copied' : 'Copy'}
                    
                    </button>
                    <button id="downloaded" onClick={handleDownload}>
                        {isDownloaded ?  'Downloaded' : 'Download'}
                    
                    </button>
                </div>
            </div>
        </div>
    );
    
    
}
