import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import UserPanel from '../components/UserPanel';
import StarfieldCanvas from '../components/StarfieldCanvas';

export default function Home() {
  const [showSecret, setShowSecret] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Varun's Photography</title>
      </Head>

      <StarfieldCanvas />

      <div className="starfield">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="glass-card" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
            <h1>Varun's Photography</h1>
            <p>
              <a href="https://www.instagram.com/digital.photon/" target="_blank" rel="noopener noreferrer">
                @digital.photon
              </a>
            </p>
            <button onClick={() => router.push('/gallery')}>View Gallery</button>
          </div>

          <div
            style={{
              marginTop: '2rem',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setShowSecret((prev) => !prev)}
            title="Click me 👀"
          >
            Built with love by Harish · April 2025
          </div>

          {showSecret && (
            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                maxWidth: '80%',
              }}
            >
              <em>
                Hey Varun — thanks for being an incredible friend. I hope this gallery helps you keep the photography passion alive. 🌌📸
              </em>
            </div>
          )}
        </div>
      </div>

      <UserPanel />
    </>
  );
}
