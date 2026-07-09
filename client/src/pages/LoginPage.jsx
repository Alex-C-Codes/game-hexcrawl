import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/library';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setInfo('Account created. Check your email to confirm, then sign in.');
        setMode('signin');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%', maxWidth: 340, background: '#0d0d18', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <h1 style={{ color: '#c9a84c', fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h1>

        <label style={{ color: '#8a8070', fontSize: '0.75rem' }}>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={{ color: '#8a8070', fontSize: '0.75rem' }}>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>

        {error && <div style={{ color: '#c05050', fontSize: '0.75rem' }}>{error}</div>}
        {info  && <div style={{ color: '#5a9a5a', fontSize: '0.75rem' }}>{info}</div>}

        <button type="submit" disabled={busy} style={{
          background: '#1e1a0c', border: '1px solid #c9a84c', borderRadius: 4,
          color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.85rem',
          padding: '8px 0', cursor: busy ? 'default' : 'pointer', marginTop: 6,
        }}>
          {busy ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setInfo(''); }}
          style={{
            background: 'none', border: 'none', color: '#5a5040', fontFamily: 'Georgia, serif',
            fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          {mode === 'signin' ? "Need an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginTop: 4,
  background: '#181510',
  border: '1px solid #3a3020',
  borderRadius: 4,
  color: '#e0d8c8',
  fontFamily: 'Georgia, serif',
  fontSize: '0.85rem',
  padding: '7px 10px',
};
