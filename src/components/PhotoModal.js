// src/components/PhotoModal.js
import { useEffect } from 'react';
import Image from 'next/image';

export default function PhotoModal({ photo, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!photo) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={photo.url}
                    alt={photo.description || 'Full view'}
                    width={800}
                    height={600}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
                />
                <div className="modal-info">
                    <h2>{photo.description || 'Untitled'}</h2>
                    {photo.camera && <p><strong>Camera:</strong> {photo.camera}</p>}
                    {photo.location && <p><strong>Location:</strong> {photo.location}</p>}
                    <p><strong>Visibility:</strong> {photo.visibility}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
