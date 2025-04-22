// src/pages/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login, onAuthChange, getUserRole } from '../firebase/auth';
import StarfieldCanvas from '../components/StarfieldCanvas';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        if (role === 'admin') router.push('/admin');
        else router.push('/gallery');
      }
    });
    return () => unsub();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await login(email, password);
    if (error) setError(error);
    setLoading(false);
  };

  return (
    <>
      <StarfieldCanvas />

      <div className="starfield">
        <div className="glass-card" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '1rem' }}>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '1rem' }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '1rem' }}
            />

            {error && <p style={{ color: 'salmon', marginBottom: '0.5rem' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
