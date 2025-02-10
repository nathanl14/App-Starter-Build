
import firebase from 'firebase';
  
const firebaseConfig = {
  apiKey: "AIzaSyA2VbjYb_7Z7YiH0cn0TsB36mD33cZbggc",
  authDomain: "actor-5f67c.firebaseapp.com",
  databaseURL: "https://actor-5f67c-default-rtdb.firebaseio.com",
  projectId: "actor-5f67c",
  storageBucket: "actor-5f67c.appspot.com",
  messagingSenderId: "218664192487",
  appId: "1:218664192487:web:47ecdf33028c5f17345542"
};
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;