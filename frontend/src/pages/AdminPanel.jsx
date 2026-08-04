import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Welcome, Admin. System statistics and user management features will appear here in the future.
        </p>
      </div>
    </div>
  );
}