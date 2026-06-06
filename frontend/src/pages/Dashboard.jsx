import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [myListings, setMyListings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // In a real app we'd have a specific endpoint for user's listings
    // For now we'll fetch all and filter client side
    const fetchMyListings = async () => {
      try {
        const res = await axios.get('/api/listings');
        const mine = res.data.filter(l => l.seller._id === user._id || l.seller === user._id);
        setMyListings(mine);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchMyListings();
  }, [user]);

  if (!user) return <div style={{textAlign: 'center', padding: '4rem'}}>Please log in to view your dashboard.</div>;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', alignSelf: 'start' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {user.name.charAt(0)}
          </div>
          <h2>{user.name}</h2>
          <p style={{ color: 'var(--text-muted)' }}>📍 {user.location}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Member since 2026</p>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>My Listings</h2>
            <button className="btn btn-primary">+ New Listing</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myListings.length === 0 ? (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                You haven't posted any art supplies yet.
              </div>
            ) : (
              myListings.map(item => (
                <div key={item._id} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <img src={item.images[0]} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                    <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', margin: '0.5rem 0' }}>${item.price}</p>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success-color)', borderRadius: '12px' }}>{item.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-secondary" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
