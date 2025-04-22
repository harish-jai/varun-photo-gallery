// src/pages/admin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthChange, getUserRole } from '../firebase/auth';
import { uploadPhoto } from '../firebase/storage';
import UserPanel from '../components/UserPanel';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [camera, setCamera] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const role = await getUserRole(user.uid);
      if (role !== 'admin') {
        router.replace('/login');
        return;
      }

      setAuthorized(true);
      setUserEmail(user.email);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Uploading...');
    if (!file) return setSubmitStatus('No file selected');

    const metadata = { camera, location, description, visibility };
    const result = await uploadPhoto(file, metadata, userEmail);

    if (result.success) {
      setSubmitStatus('✅ Upload successful!');
      setFile(null);
      setCamera('');
      setLocation('');
      setDescription('');
      setVisibility('public');
    } else {
      setSubmitStatus('❌ Upload failed: ' + result.error);
    }
  };

  if (loading) return <p className="page" style={{ color: 'white', padding: '2rem' }}>Checking permissions...</p>;
  if (!authorized) return null;

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      {/* Floating back home button */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
      }}>
        <button onClick={() => router.push('/')}>← Back Home</button>
      </div>

      {/* Glassy admin form */}
      <div
        style={{
          maxWidth: 700,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          color: 'white',
          width: '100%',
        }}
      >
        <div className="admin-form">
          <h2>Admin Upload</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <input
              type="text"
              placeholder="Camera"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="friend">Friends Only</option>
              <option value="private">Private</option>
            </select>

            <button type="submit">Upload</button>
          </form>
          <p style={{ marginTop: '1rem' }}>{submitStatus}</p>
        </div>

      </div>

      <UserPanel />
    </div>
  );
}
