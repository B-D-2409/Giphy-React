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
import Favorites from './views/favorites/Favorites';
import SingleGif from './views/single-gif/SingleGif';
import Menu from './views/Menu/Menu';
import Help from './views/Help/help';
import Faq from './views/Help/Faq';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/users.service';
import { getAdminData } from './services/admin.service';
import { Admin } from './Admin/Admin';

function App() {
  const [gifs, setGifs] = useState([]); 
  const [user, loading, error] = useAuthState(auth);

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

  useEffect(() => {

    if(!user) return;

    setAppState(prev => ({
      ...prev,
      user,
    }))

    getUserData(user.uid)
    .then(async (data) => {
      if(!data || Object.keys(data).length === 0) {
        console.log('No user data found');
        return;
      }

      const userData = data[Object.keys(data)[0]];
      const adminData = await getAdminData(user.uid);

      const isAdmin = adminData ? adminData.isAdmin : false;

      setAppState((prev) => ({
        ...prev,
        userData: {
          ...userData,
          isAdmin,
          adminDetails: adminData,
        },
      }))
    })
    .catch((err) => {
      console.error('Error fetching user data', err);
    })

  },[user])

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div className="error">Error: {error.message}</div>;
  }
  return (
    <BrowserRouter>
      <AppContext.Provider    value={{
          user: appState.user,
          userData: appState.userData,
          setAppState,
        }}>
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
          <Route path="/Menu" element={<Authenticated><Menu/></Authenticated>} />
          <Route path='/Help' element={<Help  />} />
          <Route path="/faq" element={<Faq />} />
          <Route path='/Upload' element={<Authenticated><Upload gifs={gifs}/></Authenticated>} />
          <Route path="/Create" element={<Authenticated><Create gifs={gifs}/></Authenticated>} />
          <Route path="/favorites" element={<Authenticated><Favorites gifs={gifs}/></Authenticated>} />
          <Route path="/single-gif/:id" element={<Authenticated><SingleGif /></Authenticated>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Authenticated><Admin /></Authenticated>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
