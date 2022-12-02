import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBK9xyacrcNf1DAKZSobuP41BLk-xyx6KE',
  authDomain: 'todos-c6656.firebaseapp.com',
  databaseURL: 'https://todos-c6656-default-rtdb.firebaseio.com',
  projectId: 'todos-c6656',
  storageBucket: 'todos-c6656.appspot.com',
  messagingSenderId: '100251909714',
  appId: '1:100251909714:web:6b6f59cda2edba2734e98b',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);