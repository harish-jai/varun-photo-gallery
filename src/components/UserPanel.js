// src/components/UserPanel.js
import { useEffect, useState } from 'react';
import { onAuthChange, logout } from '../firebase/auth';
import { getUserRole } from '../firebase/auth';
import { useRouter } from 'next/router';

export default function UserPanel() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('guest');
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthChange(async (user) => {
            if (user) {
                setUser(user);
                const r = await getUserRole(user.uid);
                setRole(r || 'guest');
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
        <div
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'white', // ✅ force white text
                padding: '1rem',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '0.9rem',
                zIndex: 1000,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
            }}
        >
            <p style={{ margin: 0 }}>
                {user ? `${user.email} (${role})` : 'Guest'}
            </p>
            {user ? (
                <button
                    onClick={logout}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'white',
                        color: 'black',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background 0.2s ease',
                    }}
                >
                    Logout
                </button>
            ) : (
                <button onClick={() => router.push('/login')} style={{
                    marginTop: '0.5rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'white',
                    color: 'black',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.2s ease',
                }}>Login</button>
            )}
        </div>
    );
}
