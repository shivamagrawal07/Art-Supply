import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import SwapRequests from './pages/SwapRequests';
import Chat from './pages/Chat';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/swaps" element={<SwapRequests />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
