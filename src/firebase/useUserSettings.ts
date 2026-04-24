import { useState, useEffect } from 'react';
import { db, auth } from './config';
import { ref, onValue, update } from 'firebase/database';

export function useUserSettings(defaultSettings: any) {
  const [settings, setSettings] = useState(defaultSettings);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const settingsRef = ref(db, `users/${user.uid}/settings`);
    
    // Listen for changes
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.val());
      }
    });
    return unsubscribe;
  }, [user]);

  const updateSettings = async (newSettings: any) => {
    if (!user) return;
    await update(ref(db, `users/${user.uid}/settings`), newSettings);
  };

  return { settings, updateSettings };
}
