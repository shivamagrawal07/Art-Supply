import { Link, useNavigate } from 'react-router-dom';
import { Palette, Share2, Users, Search, Paintbrush, Book, PenTool, LayoutTemplate } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/marketplace?q=${encodeURIComponent(category)}`);
  };

  const categories = [
    { name: 'Paints', icon: Palette, color: '#fca5a5', desc: 'Oils, Acrylics & Watercolors' },
    { name: 'Brushes', icon: Paintbrush, color: '#93c5fd', desc: 'Sets & Individual Brushes' },
    { name: 'Canvas', icon: LayoutTemplate, color: '#fde047', desc: 'Panels, Rolls & Stretched' },
    { name: 'Sketchbooks', icon: Book, color: '#d8b4fe', desc: 'Pads, Blocks & Journals' },
    { name: 'Markers', icon: PenTool, color: '#86efac', desc: 'Pens, Inks & Markers' }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '6rem', padding: '0 1rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Swap, Buy & Sell Art Supplies
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Give unused art materials a new home. Buy, sell, or swap paints, brushes, canvases, sketchbooks, and more—all in one creative marketplace.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/marketplace" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} /> Explore Marketplace
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Join Community
            </Link>
          </div>
        </div>

        {/* Hero Collage */}
        <div style={{ position: 'relative', height: '400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', gridRow: '1 / 3' }}>
            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop" alt="Art Supplies" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400&auto=format&fit=crop" alt="Paints" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1583225214464-9296029427aa?q=80&w=400&auto=format&fit=crop" alt="Brushes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ marginBottom: '6rem', padding: '0 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Shop by Category</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button 
                key={i} 
                onClick={() => handleCategoryClick(cat.name)}
                className="glass-panel" 
                style={{ flex: '1 1 200px', maxWidth: '240px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', border: 'none', cursor: 'pointer', transition: 'transform 0.2s, background 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--surface-color)'; }}
              >
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '50%' }}>
                  <Icon size={36} color={cat.color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'aliceblue', marginBottom: '0.25rem' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'lightblue' }}>{cat.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 1rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Palette size={32} color="var(--accent-purple)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Find Rare Materials</h3>
          <p style={{ color: 'var(--text-muted)' }}>Discover unique, vintage, or specialized art supplies from other creators.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Share2 size={32} color="var(--accent-pink)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Direct Swaps</h3>
          <p style={{ color: 'var(--text-muted)' }}>Propose trades directly with other artists. No money needs to change hands.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-surface-hover)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Users size={32} color="var(--success)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Connect Locally</h3>
          <p style={{ color: 'var(--text-muted)' }}>Meet up with local artists in your area to exchange supplies and ideas.</p>
        </div>
      </section>
    </div>
  );
}