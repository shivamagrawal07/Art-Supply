import { Link } from 'react-router-dom';
import { ArrowRight, Palette, RefreshCw, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: '1.1' }}>
        Create More. <br/><span className="text-gradient">Waste Less.</span>
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Join the premier marketplace for artists to buy, sell, and swap unused art supplies locally. Support sustainability and fuel your creativity.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '5rem' }}>
        <Link to="/marketplace" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Explore Marketplace <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Palette color="var(--secondary-color)" size={40} style={{ marginBottom: '1rem' }} />
          <h3>Premium Supplies</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Find high-quality paints, canvases, and tools at a fraction of retail prices.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <RefreshCw color="var(--primary-color)" size={40} style={{ marginBottom: '1rem' }} />
          <h3>Swap & Exchange</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Have unused materials? Trade them directly with other artists for what you need.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Users color="var(--success-color)" size={40} style={{ marginBottom: '1rem' }} />
          <h3>Local Community</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Connect with creative professionals and hobbyists right in your neighborhood.</p>
        </div>
      </div>
    </div>
  );
}
