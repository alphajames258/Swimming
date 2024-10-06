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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'swimming-472cb.firebaseapp.com',
  projectId: 'swimming-472cb',
  storageBucket: 'swimming-472cb.appspot.com',
  messagingSenderId: '1072230841035',
  appId: '1:1072230841035:web:45bd9a7cc9de4d40c7f94e',
  measurementId: 'G-0YDYRJNPSJ',
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
