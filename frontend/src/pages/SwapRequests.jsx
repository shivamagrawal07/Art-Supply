import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { Check, X } from 'lucide-react';

export default function SwapRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchRequests();
  }, [user, navigate]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/swaps');
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching swaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/swaps/${id}`, { status });
      fetchRequests();
    } catch (error) {
      alert('Error updating status: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!user) return null;

  const incomingRequests = requests.filter(r => r.receiver._id === user._id);
  const outgoingRequests = requests.filter(r => r.requestor._id === user._id);

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem' }}>Swap Requests</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Incoming Requests */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Incoming Requests</h3>
          {loading ? (
            <div>Loading...</div>
          ) : incomingRequests.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>No incoming requests</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {incomingRequests.map(req => (
                <div key={req._id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${req.status === 'pending' ? 'var(--secondary-color)' : req.status === 'accepted' ? 'var(--success-color)' : 'var(--danger-color)'}` }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--primary-color)' }}>{req.requestor.name}</strong> wants to trade for your{' '}
                    <Link to={`/product/${req.targetListing._id}`} style={{ fontWeight: 'bold' }}>{req.targetListing.title}</Link>
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    They are offering: <Link to={`/product/${req.offeredListing._id}`} style={{ fontWeight: 'bold' }}>{req.offeredListing.title}</Link>
                  </p>
                  {req.message && (
                    <div style={{ background: 'var(--surface-color)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      "{req.message}"
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--text-muted)' }}>Status: {req.status}</span>
                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleUpdateStatus(req._id, 'rejected')} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', gap: '0.25rem' }}>
                          <X size={16} /> Reject
                        </button>
                        <button onClick={() => handleUpdateStatus(req._id, 'accepted')} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', display: 'flex', gap: '0.25rem' }}>
                          <Check size={16} /> Accept
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Outgoing Requests */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Outgoing Requests</h3>
          {loading ? (
            <div>Loading...</div>
          ) : outgoingRequests.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>No outgoing requests</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {outgoingRequests.map(req => (
                <div key={req._id} className="glass-panel" style={{ padding: '1.5rem', opacity: 0.9 }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    You requested <Link to={`/product/${req.targetListing._id}`} style={{ fontWeight: 'bold' }}>{req.targetListing.title}</Link>{' '}
                    from <strong style={{ color: 'var(--primary-color)' }}>{req.receiver.name}</strong>
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    You offered: <Link to={`/product/${req.offeredListing._id}`} style={{ fontWeight: 'bold' }}>{req.offeredListing.title}</Link>
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold', color: req.status === 'accepted' ? 'var(--success-color)' : req.status === 'rejected' ? 'var(--danger-color)' : 'var(--text-muted)' }}>
                      Status: {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}