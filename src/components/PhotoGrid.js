// src/components/PhotoGrid.js
import PhotoCard from './PhotoCard';

export default function PhotoGrid({ photos, onPhotoClick }) {
  return (
    <div className="photo-grid">
      {photos.map((photo, idx) => (
        <PhotoCard key={idx} photo={photo} onClick={onPhotoClick} />
      ))}
    </div>
  );
}
