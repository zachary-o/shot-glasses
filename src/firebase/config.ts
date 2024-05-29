import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyDFh-AdTYt4nUB2f3Q2cB8YEZMCamRdrnQ",
  authDomain: "shot-glasses-a890d.firebaseapp.com",
  projectId: "shot-glasses-a890d",
  storageBucket: "shot-glasses-a890d.appspot.com",
  messagingSenderId: "639698486385",
  appId: "1:639698486385:web:6da6943481aa7f88ec47d0",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
