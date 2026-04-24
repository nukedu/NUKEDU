import {
  ref,
  set,
  get,
  push,
  update,
  remove,
  onValue,
  off,
  serverTimestamp,
  DataSnapshot,
} from 'firebase/database';
import { db, auth } from './config';

// Middleware log aktivitas
const logAction = async (action: string, details: string, data: any) => {
  const user = auth.currentUser;
  if (!user) return;
  
  const logRef = push(ref(db, 'activity_logs'));
  await set(logRef, {
    uid: user.uid,
    userName: user.displayName || 'Pengguna',
    action,
    details,
    data: JSON.stringify(data),
    timestamp: serverTimestamp(),
  });
};

export const dbSet = async (path: string, data: any, logMsg?: string) => {
  const result = await set(ref(db, path), { ...data, updatedAt: serverTimestamp() });
  if (logMsg) await logAction('SET', logMsg, data);
  return result;
};

export const dbPush = async (path: string, data: any, logMsg?: string) => {
  const newRef = push(ref(db, path));
  await set(newRef, { ...data, id: newRef.key, createdAt: serverTimestamp() });
  if (logMsg) await logAction('PUSH', logMsg, data);
  return newRef.key;
};

export const dbUpdate = async (path: string, data: any, logMsg?: string) => {
  const result = await update(ref(db, path), { ...data, updatedAt: serverTimestamp() });
  if (logMsg) await logAction('UPDATE', logMsg, data);
  return result;
};

export const dbRemove = async (path: string, logMsg?: string) => {
  const result = await remove(ref(db, path));
  if (logMsg) await logAction('REMOVE', logMsg, path);
  return result;
};

export const dbGet = async (path: string) => {
  const snapshot = await get(ref(db, path));
  return snapshot.exists() ? snapshot.val() : null;
};

export const dbListen = (path: string, callback: (data: any) => void) => {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot: DataSnapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
  return () => off(dbRef);
};
