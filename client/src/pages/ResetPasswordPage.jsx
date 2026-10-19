import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Supabase exchanges the recovery link's token for a session automatically
    // (detectSessionInUrl) but that happens async, so wait for it before showing the form.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        setError('This reset link is invalid or has expired. Request a new one from the sign-in page.');
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setInfo('Password updated. Redirecting to sign in…');
      await supabase.auth.signOut();
      setTimeout(() => navigate('/login', { replace: true }), 1500);
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
          Set New Password
        </h1>

        {ready && (
          <>
            <label style={{ color: '#8a8070', fontSize: '0.75rem' }}>
              New Password
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ color: '#8a8070', fontSize: '0.75rem' }}>
              Confirm Password
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                style={inputStyle}
              />
            </label>
          </>
        )}

        {error && <div style={{ color: '#c05050', fontSize: '0.75rem' }}>{error}</div>}
        {info  && <div style={{ color: '#5a9a5a', fontSize: '0.75rem' }}>{info}</div>}

        {ready && (
          <button type="submit" disabled={busy} style={{
            background: '#1e1a0c', border: '1px solid #c9a84c', borderRadius: 4,
            color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.85rem',
            padding: '8px 0', cursor: busy ? 'default' : 'pointer', marginTop: 6,
          }}>
            {busy ? 'Please wait…' : 'Update Password'}
          </button>
        )}
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
