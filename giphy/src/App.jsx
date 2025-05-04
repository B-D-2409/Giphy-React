import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Entertainment from './views/Entertainment/Entertainment';
import Sports from './views/Sports/Sports';
import Stickers from './views/Stickers/Stickers';
import Artists from './views/Artists/Artists';
import Reactions from './views/Reactions/Reactions';
import Trending from './views/Trending/Trending';
import Upload from './views/Upload/Upload';
import Create from './views/Create/Create';
import { SearchBar } from './views/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [gifs, setGifs] = useState([]); // съхраняваме резултатите от търсенето

  return (
    <BrowserRouter>
      <Header />
      <div className="search-container">
        <SearchBar onResults={setGifs} /> {/* Подаваме setGifs за актуализиране на резултатите */}
        <div className="separator"></div>
      </div>

      <Routes>
        <Route path='/' element={<Trending gifs={gifs} />} />
        <Route path='/Reactions' element={<Reactions gifs={gifs} />} />
        <Route path='/Entertainment' element={<Entertainment gifs={gifs} />} />
        <Route path="/Sports" element={<Sports gifs={gifs} />} />
        <Route path="/Stickers" element={<Stickers gifs={gifs} />} />
        <Route path="/Artists" element={<Artists gifs={gifs} />} />
        <Route path='/Upload' element={<Upload gifs={gifs} />} />
        <Route path="/Create" element={<Create gifs={gifs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
