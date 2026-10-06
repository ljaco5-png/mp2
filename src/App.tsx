import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/bean/:id" element={<DetailView />} />
        </Routes>
      </main>
    </>
  );
}