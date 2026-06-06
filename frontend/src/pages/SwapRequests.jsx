import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SwapRequests() {
  const [swaps, setSwaps] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const res = await axios.get('/api/swaps', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSwaps(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchSwaps();
  }, [user]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/swaps/${id}`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      // Refresh list
      setSwaps(swaps.map(s => s._id === id ? { ...s, status } : s));
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (!user) return <div style={{textAlign: 'center', padding: '4rem'}}>Please log in.</div>;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Swap Requests</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {swaps.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No swap requests yet. Browse the marketplace to propose a trade!
          </div>
        ) : (
          swaps.map(swap => (
            <div key={swap._id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>From: <strong style={{color: 'var(--text-main)'}}>{swap.requestor?.name}</strong></span>
                <span style={{ padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold', background: swap.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : swap.status === 'accepted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: swap.status === 'pending' ? '#eab308' : swap.status === 'accepted' ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {swap.status.toUpperCase()}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>They Want:</p>
                  <h3 style={{ margin: 0 }}>{swap.targetListing?.title || 'Listing Removed'}</h3>
                </div>
                <div style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>⇄</div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>They Offer:</p>
                  <h3 style={{ margin: 0 }}>{swap.offeredListing?.title || 'Listing Removed'}</h3>
                </div>
              </div>

              {swap.message && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>"{swap.message}"</p>
                </div>
              )}

              {swap.status === 'pending' && swap.receiver?._id === user._id && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => handleUpdateStatus(swap._id, 'rejected')} className="btn btn-secondary" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}>Decline</button>
                  <button onClick={() => handleUpdateStatus(swap._id, 'accepted')} className="btn btn-primary">Accept Swap</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
