import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Plus, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', condition: 'New', price: '', imageUrl: ''
  });

  const fetchMyListings = async () => {
    try {
      const res = await api.get('/listings');
      setMyListings(res.data.filter(l => l.seller._id === user._id || l.seller === user._id));
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);


  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      await api.post('/listings', {
        ...formData,
        images: formData.imageUrl ? [formData.imageUrl] : []
      });
      alert('Listing created successfully!');
      setShowAddForm(false);
      setFormData({ title: '', description: '', category: '', condition: 'New', price: '', imageUrl: '' });
      fetchMyListings();
    } catch (error) {
      alert('Error creating listing: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>My Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Plus size={20} /> {showAddForm ? 'Cancel' : 'Add Listing'}
          </button>
          <button onClick={logout} className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--danger-color)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Create New Listing</h3>
          <form onSubmit={handleCreateListing} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title</label>
              <input type="text" name="title" className="input-field" value={formData.title} onChange={handleChange} required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
              <textarea name="description" className="input-field" rows="3" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Category</label>
              <input type="text" name="category" className="input-field" value={formData.category} onChange={handleChange} required placeholder="e.g., Paints, Canvas" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Condition</label>
              <select name="condition" className="input-field" value={formData.condition} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Lightly Used">Lightly Used</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Price (Optional)</label>
              <input type="number" name="price" className="input-field" value={formData.price} onChange={handleChange} placeholder="0 for free/swap only" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Image URL</label>
              <input type="url" name="imageUrl" className="input-field" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish Listing</button>
            </div>
          </form>
        </div>
      )}

      <h3>My Listings</h3>
      {loading ? (
        <div style={{ padding: '2rem' }}>Loading...</div>
      ) : myListings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>You haven't posted any listings yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {myListings.map(listing => (
            <Link to={`/product/${listing._id}`} key={listing._id} className="glass-panel" style={{ display: 'block', textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}>
              <div style={{ height: '160px', backgroundColor: 'var(--surface-color)', backgroundImage: `url(${listing.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              </div>
              <div style={{ padding: '1rem' }}>
                <h4 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.5rem' }}>{listing.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${listing.price || '0'}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{listing.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}