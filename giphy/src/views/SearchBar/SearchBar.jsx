import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchBar)}&limit=25`
            );
            const data = await response.json();
            onResults(data.data);
        } catch (error) {
            console.error('Error with searching', error);
        }
    };

    return (
        <div className='search-bar'>
            <input
                type='text'
                placeholder="Search GIFs..."
                value={searchBar}
                onChange={handleChange}
            />
            <button className='search-button' onClick={handleSearch}>
                <Search size={24} />
            </button>
        </div>
    );
}
