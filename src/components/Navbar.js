// src/components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onAuthChange, logout, getUserRole } from '../firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('guest');
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (user) {
        setUser(user);
        const role = await getUserRole(user.uid);
        setRole(role || 'guest');
      } else {
        setUser(null);
        setRole('guest');
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link href="/">Varun's Gallery</Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        {role === 'admin' && <Link href="/admin">Admin</Link>}
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <button onClick={handleLogout} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'blue' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
