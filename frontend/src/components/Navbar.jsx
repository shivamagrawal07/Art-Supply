import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Palette, LogOut, User as UserIcon, MessageSquare, Repeat, Search } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="glass-panel" style={{ position: 'sticky', top: '1rem', zIndex: 100, margin: '1rem 1.5rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }} className="text-gradient">
        <Palette size={28} color="var(--primary-color)" />
        ArtSwap
      </Link>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-color)', borderRadius: '20px', padding: '0.35rem 1rem', flex: '0 1 300px' }}>
        <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text" 
          placeholder="Search supplies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', width: '100%', outline: 'none', fontSize: '0.95rem' }}
        />
      </form>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/marketplace" style={{ fontWeight: 500 }}>Marketplace</Link>
        
        {user ? (
          <>
            <Link to="/swaps" title="Swap Requests" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Repeat size={18} /> Swaps
            </Link>
            <Link to="/chat" title="Messages" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MessageSquare size={18} /> Chat
            </Link>
            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <UserIcon size={18} /> Dashboard
            </Link>
            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--danger-color)' }} title="Logout">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}