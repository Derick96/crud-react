import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLIAAp_KPfJnkHXEyQtV_JaasnQ03_VZo",
    authDomain: "crud-react-derick.firebaseapp.com",
    projectId: "crud-react-derick",
    storageBucket: "crud-react-derick.appspot.com",
    messagingSenderId: "531664558517",
    appId: "1:531664558517:web:59a8ce8c0876ce50fce1fc"
  };
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export {db, auth} //tendremos acceso a las colecciones de la bd y a la autenticacion