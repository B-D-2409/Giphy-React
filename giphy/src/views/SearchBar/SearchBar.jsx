import React, { useState } from 'react';

export function SearchBar() {
    const [searchBar, setSearchBar] = useState('');

    const handleChange = (e) => {
        setSearchBar(e.target.value); 
    }

    return (
        <div className='search-bar'>
            <input
                type='text'
                placeholder="Search GIFs..."
                value={searchBar}   
                onChange={handleChange} 
                 
            />
             <button className='search-button'>🔍</button>
        </div>
    );
}
