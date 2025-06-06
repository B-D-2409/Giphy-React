import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';
export function SearchBar({ onResults }) {
    const [searchBar, setSearchBar] = useState('');

    const handleChange = (e) => {
        setSearchBar(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchBar.trim()) return;

        try {
            const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchBar)}&limit=`
            );
            const data = await response.json();
            onResults(data.data);
        } catch (error) {
            console.error('Error with searching', error);
        }
    };

    const resetToDefaultGifs = async () => {
        const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25`);
        const data = await response.json();
        onResults(data.data)

    }

    useEffect(() => {

        const delayDebounce = setTimeout(() => {
            if(searchBar.trim()) {
                handleSearch();
            }else{
                resetToDefaultGifs();
            }
        },0)

        return (() => {clearTimeout(delayDebounce)})
    }, [searchBar])


    return (
        <div className={styles[`search-bar`]}>
            <input
                type='text'
                placeholder="Search all the GIFs and Stickers..."
                value={searchBar}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
            />
            <button className={styles[`search-button`]} onClick={handleSearch}>
                <Search size={24} />
            </button>
        </div>
    );
}
