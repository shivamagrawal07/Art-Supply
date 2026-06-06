import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSwapRequest = async () => {
    if (!user) return navigate('/login');
    // Simplified: Just auto-creating a swap request for demo purposes
    // In a real app, this would open a modal to select which of YOUR items to offer
    try {
      await axios.post('http://localhost:5000/api/swaps', {
        targetListingId: product._id,
        offeredListingId: product._id, // Using same item as placeholder
        message: 'I am interested in swapping for this!'
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Swap Request Sent!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };

  if (!product) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
      <div>
        <img src={product.images[0] || 'https://via.placeholder.com/600'} alt={product.title} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
      </div>
      <div>
        <div style={{ display: 'inline-block', background: 'var(--surface-color)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {product.category} • {product.condition}
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.title}</h1>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '2rem' }}>${product.price}</h2>
        
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Description</h3>
          <p style={{ color: 'var(--text-muted)' }}>{product.description}</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ margin: 0 }}>Seller: {product.seller?.name}</h4>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>📍 {product.seller?.location}</p>
          </div>
          <button className="btn btn-secondary" onClick={() => user ? navigate('/chat') : navigate('/login')}>Message</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: '1rem' }} onClick={() => alert('Purchase flow would start here!')}>Buy Now</button>
          <button className="btn btn-secondary" style={{ flex: 1, padding: '1rem' }} onClick={handleSwapRequest}>Propose Swap</button>
        </div>
      </div>
    </div>
  );
}