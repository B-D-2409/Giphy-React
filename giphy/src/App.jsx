import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Entertainment from './views/Entertainment/Entertainment';
import Sports from './views/Sports/Sports';
import Stickers from './views/Stickers/Stickers'
import Artists from './views/Artists/Artists'
import Reactions from './views/Reactions/Reactions';
import Trending from './views/Trending/Trending';
function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Trending />} />
      <Route path='/Reactions' element={<Reactions />} />
      <Route path='/Entertainment' element={<Entertainment />} />
      <Route path="/Sports" element={<Sports />} />
      <Route path="/Stickers" element={<Stickers />} />
      <Route path="/Artists" element={<Artists />} />

    </Routes>




    </BrowserRouter>

  )
}

export default App
