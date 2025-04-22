// src/firebase/storage.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from './config';

// file: image file from <input type="file">
// metadata: { camera, location, description, visibility }
export const uploadPhoto = async (file, metadata, userEmail) => {
  try {
    const fileRef = ref(storage, `photos/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(uploadResult.ref);

    await addDoc(collection(db, 'photos'), {
      url: downloadURL,
      camera: metadata.camera,
      location: metadata.location,
      description: metadata.description,
      visibility: metadata.visibility || 'public',
      uploadedBy: userEmail,
      createdAt: serverTimestamp()
    });

    return { success: true };
  } catch (err) {
    console.error('Upload failed:', err);
    return { error: err.message };
  }
};
