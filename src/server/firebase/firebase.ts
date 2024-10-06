// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { SWIM_CLOUD, NYC_50_FREE_2023_2024 } from './constants.ts';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { getTodaysDate } from '../../utils/date.ts';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

// setToFirebase(SWIM_CLOUD, NYC_50_FREE_2023_2024, { test: '1234' });

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
