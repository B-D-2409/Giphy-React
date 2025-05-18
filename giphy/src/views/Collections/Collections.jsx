import { useEffect, useState } from 'react';
import style from './Collections.module.css';
import { getCollections,  deleteCollectionsGif } from '../../services/users.service';
export default function Collections() {
    const [collections, setCollections] = useState([]);
    const [isCopy, setIsCopy] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
    const [randomGif, setRandomGif] = useState(null);
    useEffect(() => {
        const fetchCollections = async () => {
            const storedCollections = await getCollections();

            if (storedCollections.length > 0) {
                setCollections(storedCollections);
            } else {
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&limit=1&tag=funny`
                );
                const data = await response.json();
                const randomGif = data.data;
                setRandomGif(randomGif);
            }
        }

        fetchCollections();
    }, [API_KEY]);

    const deleteCollection = async (gifId) => {
        setCollections((prev) => prev.filter((gif) => gif.id !== gifId));
        try {
            await deleteCollectionsGif(gifId);
            console.log("GIF deleted from user collections");
        } catch (err) {
            console.error("Error deleting GIF:", err);
        }
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(collections.images);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${collections.title || 'download'}.gif`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsDownloaded(true);
        } catch (error) {
            console.error("Error downloading gif:", error);
        }
    }

    const handleCopyLink = () => {
        const copyLink = collections?.images?.original?.url || '';
        navigator.clipboard.writeText(copyLink)
            .then(() => {
                setIsCopy(true);
            })
            .catch((error) => {
                console.error("Error copying link:", error);
            });
    }


return (
    <div>
        <div className={style[`collections-container`]}>
            {collections.length > 0 ? (
                collections.map((gif) => (
                    <div className={style[`collections-gif`]} key={gif.id}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                        <button className={style[`remove-collections`]} onClick={() => deleteCollection(gif.id)}>Delete</button>
                        
                        <button className={style[`Copy-link`]} onClick={handleCopyLink}>{isCopy ? 'Copied' : 'Copy'}</button>
                

                        <button className={style[`download`]} onClick={handleDownload}>{isDownloaded ? 'Downloaded' : 'Download'}</button>

                    </div>
                ))
            ) : randomGif ? (
                <div className={style[`collections-gif`]}>
                    <img src={randomGif.images.fixed_height.url} alt={randomGif.title} />
                </div>
            ) : (
                <p>No results found. Please search for GIFs.</p>
            )}
        </div>
    </div>
);
}