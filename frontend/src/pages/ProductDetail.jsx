import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Repeat } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Swap request state
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [swapMessage, setSwapMessage] = useState('');

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  const fetchListingDetails = async () => {
    try {
      const res = await api.get(`/listings/${id}`);
      setListing(res.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSwap = async () => {
    if (!user) return navigate('/login');
    setShowSwapModal(true);
    // Fetch my listings to offer
    try {
      const res = await api.get('/listings');
      // Filter for my listings (since no dedicated endpoint)
      const mine = res.data.filter(l => l.seller._id === user._id || l.seller === user._id);
      setMyListings(mine);
    } catch (error) {
      console.error('Error fetching my listings', error);
    }
  };

  const handleSendSwapRequest = async (e) => {
    e.preventDefault();
    try {
      await api.post('/swaps', {
        targetListingId: listing._id,
        offeredListingId: selectedOffer,
        message: swapMessage
      });
      alert('Swap request sent successfully!');
      setShowSwapModal(false);
    } catch (error) {
      alert('Error sending swap request: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>;
  if (!listing) return <div style={{ textAlign: 'center', padding: '3rem' }}>Listing not found</div>;

  const isOwner = user && (listing.seller._id === user._id || listing.seller === user._id);

  return (
    <div className="animate-fade-in">
      <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '2rem' }}>
        <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', minHeight: '300px', backgroundImage: `url(${listing.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '2rem' }}>{listing.title}</h1>
            <span style={{ backgroundColor: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: 600 }}>
              ${listing.price || '0'}
            </span>
          </div>
          
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '0.9rem' }}>
              Condition: {listing.condition || 'Used'}
            </span>
            <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '0.9rem' }}>
              Category: {listing.category || 'Other'}
            </span>
            <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '0.9rem' }}>
              📍 {listing.seller?.location || 'Unknown location'}
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
            {listing.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {isOwner ? (
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', width: '100%', textAlign: 'center' }}>
                This is your listing.
              </div>
            ) : (
              <>
                <button onClick={handleOpenSwap} className="btn btn-primary" style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                  <Repeat size={20} /> Request Swap
                </button>
                <button onClick={() => user ? navigate('/chat', { state: { targetUser: listing.seller } }) : navigate('/login')} className="btn btn-secondary" style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                  <MessageSquare size={20} /> Message Seller
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showSwapModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Propose a Swap</h2>
            <form onSubmit={handleSendSwapRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select an item to offer</label>
                <select className="input-field" required value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)}>
                  <option value="" disabled>-- Select one of your listings --</option>
                  {myListings.map(l => (
                    <option key={l._id} value={l._id}>{l.title} (${l.price})</option>
                  ))}
                </select>
                {myListings.length === 0 && <p style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.5rem' }}>You don't have any available listings to offer.</p>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message (Optional)</label>
                <textarea className="input-field" rows="3" value={swapMessage} onChange={(e) => setSwapMessage(e.target.value)} placeholder="Hi, would you be interested in trading for..."></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowSwapModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={myListings.length === 0}>Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}