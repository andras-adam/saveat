import { initializeApp, FirebaseOptions } from 'firebase/app'


const config: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
  authDomain: process.env.AUTH_DOMAIN,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET
}

// const config: FirebaseOptions = {
//   apiKey: "AIzaSyDuhonvNt29Mp93Qkys-_asInVJMIP2-5I",
//   appId: "1:703063071103:web:a9ecfc4a823f01f3ace24a",
//   authDomain: "save-it-93faa.firebaseapp.com",
//   messagingSenderId: "703063071103",
//   projectId: "save-it-93faa",
//   storageBucket: "save-it-93faa.appspot.com"
// }

export const app = initializeApp(config)
