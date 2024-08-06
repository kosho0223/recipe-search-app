// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA2NazmqtWXZ5U7PExOvLf5w13jq1wR2Y",
  authDomain: "recipe-search-e481e.firebaseapp.com",
  projectId: "recipe-search-e481e",
  storageBucket: "recipe-search-e481e.appspot.com",
  messagingSenderId: "801965558067",
  appId: "1:801965558067:web:6efe116b3739d877c45646",
  measurementId: "G-BK5N1FDQZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);