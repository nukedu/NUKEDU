import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// Upload file
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

// Delete file
export const deleteFile = async (path: string) => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};

// Get URL
export const getFileUrl = async (path: string) => {
  return getDownloadURL(ref(storage, path));
};
