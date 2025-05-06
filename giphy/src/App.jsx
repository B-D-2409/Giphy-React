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
import { useState,useEffect } from 'react';
import { AppContext } from './services/state/AppContext';
import Register from './components/register/Register';
import Login from './views/Login/Login';
import Authenticated from './components/hoc/authentication';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase.config';
function App() {
  const [gifs, setGifs] = useState([]); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAppState(prev => ({ ...prev, user: currentUser }));
    });
    return () => unsubscribe();
}, []);



  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  })
  return (
    <BrowserRouter>
      <AppContext.Provider value={{...appState, setAppState}}>
        <Header />
        <div className="search-container">
          <SearchBar onResults={setGifs} /> 
          <div className="separator"></div>
        </div>
        <Routes>
          <Route path='/' element={<Authenticated><Trending gifs={gifs}/></Authenticated>} />
          <Route path='/Reactions' element={<Authenticated><Reactions gifs={gifs} /></Authenticated>} />
          <Route path='/Entertainment' element={<Authenticated><Entertainment gifs={gifs} /></Authenticated>} />
          <Route path="/Sports" element={<Authenticated><Sports gifs={gifs} /></Authenticated>} />
          <Route path="/Stickers" element={<Authenticated><Stickers gifs={gifs}/></Authenticated>} />
          <Route path="/Artists" element={<Authenticated><Artists gifs={gifs}/></Authenticated>} />
          <Route path='/Upload' element={<Authenticated><Upload gifs={gifs}/></Authenticated>} />
          <Route path="/Create" element={<Authenticated><Create gifs={gifs}/></Authenticated>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
