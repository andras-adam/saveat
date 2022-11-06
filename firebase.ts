import { initializeApp, FirebaseOptions } from 'firebase/app'
import { env } from './config'


const config: FirebaseOptions = {
  apiKey: env.API_KEY,
  appId: env.APP_ID,
  authDomain: env.AUTH_DOMAIN,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET
}

export const app = initializeApp(config)
