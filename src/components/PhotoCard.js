// src/components/PhotoCard.js
import Image from 'next/image';

export default function PhotoCard({ photo, onClick }) {
  return (
    <div className="photo-card" onClick={() => onClick(photo)}>
      <div className="photo-image-wrapper">
        <Image
          src={photo.url}
          alt={photo.description || 'Photo'}
          fill
          sizes="(max-width: 600px) 100vw, 200px"
          style={{
            objectFit: 'cover',
            borderRadius: '12px',
          }}
        />
      </div>
    </div>
  );
}
