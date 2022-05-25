import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDU96BzPx8o1YI-d0SjXej4lshNigHExxQ',
  authDomain: 'https://accounts.google.com/o/oauth2/auth',
  databaseURL: 'https://fir-react-native-65fc2.firebaseio.com',
  projectId: 'rnproject-b5bd5',
  storageBucket: 'rnproject-b5bd5.appspot.com',
  messagingSenderId: '64702953437',
  appId: '1:705245012732:android:764736c2775474717dad79',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
