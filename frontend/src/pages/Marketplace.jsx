import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { Search } from 'lucide-react';

export default function Marketplace() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);

  useEffect(() => {
    fetchListings(initialQuery);
  }, [initialQuery]);

  const fetchListings = async (searchQuery = '') => {
    try {
      setLoading(true);
      const res = await api.get(`/listings${searchQuery ? `?search=${searchQuery}` : ''}`);
      setListings(res.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchListings(search);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2>Art Supply Marketplace</h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search supplies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <Search size={20} />
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading listings...</div>
      ) : listings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No listings found. Be the first to add one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {listings.map(listing => (
            <Link to={`/product/${listing._id}`} key={listing._id} className="glass-panel" style={{ display: 'block', textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', overflow: 'hidden' }}>
              <div style={{ height: '200px', backgroundColor: 'var(--surface-color)', backgroundImage: `url(${listing.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.title}</h3>
                  <span style={{ backgroundColor: 'var(--surface-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                    ${listing.price || '0'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                  {listing.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Condition: <strong style={{color: 'var(--text-main)'}}>{listing.condition || 'Used'}</strong></span>
                  <span>📍 {listing.seller?.location || 'Unknown'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}