// src/pages/gallery.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthChange, getUserRole } from '../firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

import PhotoGrid from '../components/PhotoGrid';
import PhotoModal from '../components/PhotoModal';
import UserPanel from '../components/UserPanel';

export default function GalleryPage() {
  const [userRole, setUserRole] = useState('guest');
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      let role = 'guest';
      if (user) {
        const r = await getUserRole(user.uid);
        role = r || 'guest';
      }
      setUserRole(role);
      fetchPhotos(role);
    });

    return () => unsub();
  }, []);

  const fetchPhotos = async (role) => {
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const allPhotos = snapshot.docs.map((doc) => doc.data());

    const visiblePhotos = allPhotos.filter((photo) => {
      return (
        photo.visibility === 'public' ||
        (role === 'friend' && photo.visibility === 'friend') ||
        (role === 'admin')
      );
    });

    setPhotos(allPhotos);
    setFiltered(visiblePhotos);
    setLoading(false);
  };

  return (
    <div className="page">
      {/* Floating header buttons */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        display: 'flex',
        gap: '1rem',
        zIndex: 10,
      }}>
        <button onClick={() => router.push('/')}>← Back Home</button>
        {userRole === 'admin' && (
          <button onClick={() => router.push('/admin')}>➕ Upload Photo</button>
        )}
      </div>

      {/* Main content */}
      <h2 style={{ textAlign: 'center', marginTop: '4rem', color: 'white' }}>Photo Gallery</h2>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'white' }}>Loading photos...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'white' }}>No photos to display.</p>
      ) : (
        <PhotoGrid photos={filtered} onPhotoClick={setSelectedPhoto} />
      )}

      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      <UserPanel />
    </div>
  );
}
