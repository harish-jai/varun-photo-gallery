import Head from 'next/head';
import { useRouter } from 'next/router';
import UserPanel from '../components/UserPanel';
import StarfieldCanvas from '../components/StarfieldCanvas';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Varun's Photography</title>
      </Head>

      <StarfieldCanvas />

      <div className="starfield">
        <div className="glass-card-wrapper">
          <div className="glass-blur-overlay" />
          <div className="glass-card">
            <h1>Varun's Photography</h1>
            <p>
              <a
                href="https://www.instagram.com/digital.photon/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @digital.photon
              </a>
            </p>
            <button onClick={() => router.push('/gallery')}>View Gallery</button>
          </div>
        </div>
      </div>

      <UserPanel />
    </>
  );
}
