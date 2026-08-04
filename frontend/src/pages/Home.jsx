import { Link } from 'react-router-dom';
import { Palette, Share2, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          Swap Art Supplies.<br />Fuel Your Creativity.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Join the community of artists trading unused materials. Clear your studio, find what you need, and save money while creating sustainably.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/marketplace" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Explore Marketplace
          </Link>
          <Link to="/register" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Join the Community
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 1rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Palette size={32} color="var(--primary-color)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Find Rare Materials</h3>
          <p style={{ color: 'var(--text-muted)' }}>Discover unique, vintage, or specialized art supplies from other creators.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Share2 size={32} color="var(--secondary-color)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Direct Swaps</h3>
          <p style={{ color: 'var(--text-muted)' }}>Propose trades directly with other artists. No money needs to change hands.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Users size={32} color="var(--success-color)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Connect Locally</h3>
          <p style={{ color: 'var(--text-muted)' }}>Meet up with local artists in your area to exchange supplies and ideas.</p>
        </div>
      </section>
    </div>
  );
}