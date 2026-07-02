import { initializeApp, getApps } from 'firebase/app'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  envConfig.projectId && envConfig.projectId !== 'your-project-id'
)

if (!isFirebaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Firebase env vars — copy .env.example to .env and fill in your project config.'
  )
}

const INERT_CONFIG = {
  apiKey: 'not-configured',
  authDomain: 'not-configured.firebaseapp.com',
  projectId: 'not-configured',
  storageBucket: 'not-configured.appspot.com',
  messagingSenderId: '0',
  appId: '1:0:web:0',
}

const app = getApps().length ? getApps()[0] : initializeApp(isFirebaseConfigured ? envConfig : INERT_CONFIG)

// Persistent cache: subsequent visits read instantly from IndexedDB, then sync in background.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})

export const auth = getAuth(app)
export const storage = getStorage(app)
