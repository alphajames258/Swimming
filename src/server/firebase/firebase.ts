// Import the functions you need from the SDKs you need
import '../../../envConfig.ts';

import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { SWIM_CLOUD, NYC_50_FREE_2023_2024 } from './constants.ts';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { getTodaysDate } from '../../utils/date.ts';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User signed in:', userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error) {
    console.error('Error signing in:', error);
  }
}

// Example usage
(async () => {
  const uid = await signIn('anthonylee2797@gmail.com', 'test123');
  if (uid) {
    console.log('Authenticated user UID:', uid);
    // Now you can use the UID for user-specific operations
  }
})();

const firestore = getFirestore(app);

export async function setToFirebase(collection, document, data) {
  // Format the date as "MM-DD-YYYY"
  const formattedDate = getTodaysDate();
  await setDoc(doc(firestore, collection, document), {
    date: formattedDate,
    data: data,
  });

  console.log(
    `Time: ${formattedDate} - Collection: ${collection} - Doc: ${document}`
  );
  return;
}
export async function getFirebaseStore(collection, document) {
  const docSnap = await getDoc(doc(firestore, collection, document));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

getFirebaseStore(SWIM_CLOUD, NYC_50_FREE_2023_2024);
