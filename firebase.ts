import { initializeApp, FirebaseOptions } from 'firebase/app'


const config: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
  authDomain: process.env.AUTH_DOMAIN,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET
}

export const app = initializeApp(config)
