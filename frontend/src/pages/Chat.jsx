import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Send } from 'lucide-react';

export default function Chat() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [targetUser, setTargetUser] = useState(location.state?.targetUser || null);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    if (!targetUser?._id) return;
    try {
      const res = await api.get(`/messages/${targetUser._id}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (targetUser) {
      fetchMessages();
      // Polling every 5 seconds for new messages
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, targetUser, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !targetUser) return;
    
    try {
      await api.post('/messages', {
        receiverId: targetUser._id,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      alert('Error sending message');
    }
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: '1rem' }}>
      <div className="glass-panel" style={{ width: '300px', padding: '1rem', overflowY: 'auto' }}>
        <h3 style={{ marginBottom: '1rem' }}>Contacts</h3>
        {targetUser ? (
          <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '8px', cursor: 'pointer' }}>
            <div style={{ fontWeight: 'bold' }}>{targetUser.name}</div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>
            Select a seller from a listing to start chatting.
          </p>
        )}
      </div>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {targetUser ? (
          <>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Chat with {targetUser.name}
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>No messages yet. Say hi!</p>
              ) : (
                messages.map(msg => {
                  const isMe = msg.sender === user._id;
                  return (
                    <div key={msg._id} style={{ 
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '70%',
                      background: isMe ? 'var(--primary-color)' : 'var(--surface-color)',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      borderBottomRightRadius: isMe ? '0' : '12px',
                      borderBottomLeftRadius: isMe ? '12px' : '0'
                    }}>
                      {msg.content}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--surface-color)', display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ flex: 1, background: 'var(--bg-color)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem' }}>
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            No conversation selected.
          </div>
        )}
      </div>
    </div>
  );
}